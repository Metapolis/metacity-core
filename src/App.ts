import "reflect-metadata";
import * as Winston from "winston";
import { Client } from "elasticsearch";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { Utils } from "./common/Utils";
import { TrafficQueryServiceImpl } from "./services/query/impl/TrafficQueryServiceImpl";
import { TrafficQueryService } from "./services/query/TrafficQueryService";
import { TrafficController } from "./controllers/rest/TrafficController";
import { AuthenticationController } from "./controllers/rest/AuthenticationController";
import * as Express from "express";
import * as Path from "path";
import { Config } from "./Config";
import * as BodyParser from "body-parser";
import * as TypeORM from "typeorm";
import { User } from "./persistence/domain/User";
import * as HTTPStatusCodes from "http-status-codes";
import { UserDao } from "./persistence/dao/UserDao";
import { UserDaoImpl } from "./persistence/dao/impl/UserDaoImpl";
import { UserAuthenticationQueryServiceImpl } from "./services/query/impl/UserAuthenticationQueryServiceImpl";
import { UserAuthenticationQueryService } from "./services/query/UserAuthenticationQueryService";
import { IllegalArgumentError } from "./common/error/IllegalArgumentError";
import { AccessDeniedError } from "./common/error/AccessDeniedError";
import { TweetController } from "./controllers/rest/TweetController";
import { TweetQueryService } from "./services/query/TweetQueryService";
import { TweetQueryServiceImpl } from "./services/query/impl/TweetQueryServiceImpl";
import { RequestAccessor } from "./RequestAccessor";
import { Collectivity } from "./persistence/domain/Collectivity";
import { CollectivityDaoImpl } from "./persistence/dao/impl/CollectivityDaoImpl";
import { CollectivityDao } from "./persistence/dao/CollectivityDao";
import { ContextApp } from "./ContextApp";
import { CollectivityQueryService } from "./services/query/CollectivityQueryService";
import { CollectivityQueryServiceImpl } from "./services/query/impl/CollectivityQueryServiceImpl";
import { SecurityManager } from "./common/security/SecurityManager";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { ActivityCircle } from "./persistence/domain/ActivityCircle";
import { CircleCommandService } from "./services/command/CircleCommandService";
import { CircleCommandServiceImpl } from "./services/command/impl/CircleCommandServiceImpl";
import { CollectivityController } from "./controllers/rest/CollectivityController";
import { CircleDao } from "./persistence/dao/CircleDao";
import { CircleDaoImpl } from "./persistence/dao/impl/CircleDaoImpl";

/**
 * The App.
 *
 * @class App
 */
export class App {

    /**
     * App logger
     *
     * @type {LoggerInstance}
     */
    private logger: Winston.LoggerInstance = Utils.createLogger(App.name);

    /**
     * Container declaration
     *
     * @type {LoggerInstance}
     */
    private container: Container;

    /**
     * Express application
     *
     * @type {Application}
     */
    private expressServer: Express.Application;

    /**
     * Bootstrap the application.
     *
     * @class Server
     * @method bootstrap
     * @static
     * @return Returns the newly created injector for this app.
     */
    public async bootstrap(): Promise<Container> {
        this.logger.info("Metacity core is launching");
        // set up container
        this.container = new Container();

        // bind all service
        await this.initModule();
        ContextApp.setContainer(this.container);

        return this.container;
    }

    /**
     * Bind the elastic search client
     */
    private bindElasticClient(): void {
        this.logger.debug("Create ElasticSearch client");
        // Create the elasticSearch client
        const elasticClient = new Client({
            host: Config.getElasticSearchHost(),
            log: Config.getElasticSearchLogLevel(),
        });
        try {
            elasticClient.ping({
                requestTimeout: 3000,
            }, (error) => {
                if (error) {
                    this.logger.error("ElasticSearch cluster is down!");
                    this.logger.error("Several features part will not work");
                } else {
                    this.logger.debug("ElasticSearch client connected");
                    this.logger.debug("ElasticSearch cluster is well!");
                }
            });
        } catch (e) {
            this.logger.error("An error occurred to contact ElasticSearch");
        }

        this.logger.debug("Binding ElasticSearch client");
        this.container.bind<Client>("ESClient").toConstantValue(elasticClient);
    }

    /**
     * Bind all commands
     */
    private bindCommands(): void {
        this.logger.debug("Binding command");
        this.container.bind<CircleCommandService>("CircleCommandService").to(CircleCommandServiceImpl);
    }

    /**
     * Bind all query services
     */
    private bindQueries(): void {
        this.logger.debug("Binding query");
        this.container.bind<TrafficQueryService>("TrafficQueryService").to(TrafficQueryServiceImpl);
        this.container.bind<TweetQueryService>("TweetQueryService").to(TweetQueryServiceImpl);
        this.container.bind<CollectivityQueryService>("CollectivityQueryService").to(CollectivityQueryServiceImpl);
        this.container.bind<UserAuthenticationQueryService>("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
    }

    /**
     * Bind all controllers
     */
    private bindControllers(): void {
        this.logger.debug("Binding controllers");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(TrafficController).whenTargetNamed("TrafficController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(AuthenticationController).whenTargetNamed("AuthenticationController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(TweetController).whenTargetNamed("TweetController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(CollectivityController).whenTargetNamed("CollectivityController");
    }

    /**
     * Initialization of data base connection
     */
    private async initModule(): Promise<void> {
        this.logger.debug("Connect to database");
        await TypeORM.createConnection({
            dropSchemaOnConnection: Config.isDatabaseDropSchema(),
            autoSchemaSync: Config.isDatabaseAutoSchemaSync(),
            driver: {
                database: Config.getDatabaseName(),
                host: Config.getDatabaseHost(),
                password: Config.getDatabasePassword(),
                port: Config.getDatabasePort(),
                type: "postgres",
                username: Config.getDatabaseUser()
            },
            entities: [
                __dirname + "/persistence/domain/*.js"
            ],
        }).then((connection: TypeORM.Connection) => {
            this.logger.debug("Connexion to database succeed");
            this.logger.debug("Begin to bind all services");
            this.bindRepository(connection);
        }).catch((error) => {
            this.logger.error(error);
        });
        // Bind security manager
        this.container.bind<SecurityManager>("SecurityManager").to(SecurityManager);

        this.bindDao();
        this.bindCommands();
        this.bindQueries();
        this.bindControllers();
        this.bindElasticClient();
        this.createServer();

    }

    /**
     * Create a new server with specific configuration
     */
    private async createServer(): Promise<void> {
        const server = new InversifyExpressServer(this.container);
        server.setConfig((app) => {
            const expressWinston = require("express-winston");
            app.use(expressWinston.logger({
                transports: [
                    new Winston.transports.Console({
                        json: true,
                        colorize: true
                    })
                ],
                meta: false, // optional: control whether you want to log the meta data about the request (default to true)
                msg: "HTTP {{req.method}} {{req.url}} {{res}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
                colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
                level: "info"
            }));

            app.use(BodyParser.urlencoded({
                extended: true
            }));
            app.use(BodyParser.json());
            // Add static file server to serve angular resources
            const publicPath = Path.join(__dirname, "../../client/src");
            this.logger.debug("Static file location: '%s'", publicPath);
            app.use("/", Express.static(publicPath));
            app.use(methodOverride());
            app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                if (!/^\/api/.test(req.path)) {
                    res.sendFile(Path.join(__dirname, "../../client/src/index.html"));
                    return;
                }
                RequestAccessor.setRequest(req);
                next();
            });
        });
        server.setErrorConfig((app) => {
            app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                if (/^\/api/.test(req.path)) {
                    this.logger.error("An error occurred on api resources");
                    if (err instanceof IllegalArgumentError) {
                        this.logger.error("Message: %s \n Stack: %s", err.message, err.stack);
                        res.status(HTTPStatusCodes.BAD_REQUEST).send({message: err.message});
                    } else if (err instanceof AccessDeniedError) {
                        this.logger.error("Message: %s \n Stack: %s", err.message, err.stack);
                        res.status(HTTPStatusCodes.FORBIDDEN).send({message: err.message});
                    } else {
                        this.logger.error("Message: %s \n Stack: %s", err.message, err.stack);
                        res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({message: err.message});
                    }
                }
                next();
            });
        });
        this.expressServer = await server.build();
        this.logger.info("server conf:" + Config.getAppHost() + ":" + Config.getAppPort());
        this.expressServer.listen(Config.getAppPort(), Config.getAppHost());
        this.logger.info("Server launched");
    }

    /**
     * Bind all DAOs
     */
    private bindDao(): void {
        this.logger.debug("Binding DAO");
        this.container.bind<UserDao>("UserDao").to(UserDaoImpl);
        this.container.bind<CollectivityDao>("CollectivityDao").to(CollectivityDaoImpl);
        this.container.bind<CircleDao>("CircleDao").to(CircleDaoImpl);

    }

    /**
     * Bind all repositories
     *
     * @param connection
     */
    private bindRepository(connection: TypeORM.Connection): void {
        this.container.bind<TypeORM.Repository<User>>("UserRepository").toConstantValue(connection.entityManager.getRepository(User));
        this.container.bind<TypeORM.Repository<ActivityCircle>>("ActivityCircleRepository").toConstantValue(connection.entityManager.getRepository(ActivityCircle));
        this.container.bind<TypeORM.Repository<Collectivity>>("CollectivityRepository").toConstantValue(connection.entityManager.getRepository(Collectivity));
    }
}
