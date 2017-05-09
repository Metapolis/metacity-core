import "reflect-metadata";
import errorHandler = require("errorhandler");
import { LoggerInstance } from "winston";
import methodOverride = require("method-override");
import { Client } from "elasticsearch";
import { Container } from "inversify";
import { interfaces, InversifyExpressServer, TYPE } from "inversify-express-utils";
import { IndexController } from "./controllers/IndexController";
import { Utils } from "./common/Utils";
import { TrafficQueryServiceImpl } from "./services/query/impl/TrafficQueryServiceImpl";
import { TrafficQueryService } from "./services/query/TrafficQueryService";
import * as Express from "express";
import * as Path from "path";
import { Config } from "./Config";
import * as BodyParser from "body-parser";
import { TrafficController } from "./controllers/rest/TrafficController";
import { AuthenticationController } from "./controllers/rest/AuthenticationController";
import * as TypeORM from "typeorm";
import { User } from "./persistence/domain/User";
import * as HTTPStatusCodes from "http-status-codes";
import { UserDao } from "./persistence/dao/UserDao";
import { UserDaoImpl } from "./persistence/dao/impl/UserDaoImpl";
import { UserAuthenticationQueryServiceImpl } from "./services/query/impl/UserAuthenticationQueryServiceImpl";
import { UserAuthenticationQueryService } from "./services/query/UserAuthenticationQueryService";
import { IllegalArgumentError } from "./common/error/IllegalArgumentError";
import { AccessDeniedError } from "./common/error/AccessDeniedError";

/**
 * The server.
 *
 * @class Server
 */
export class App {

    /**
     * App logger
     *
     * @type {LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(App.name);

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
    public bootstrap(): Container {
        this.logger.info("Metacity core is launching");
        // set up container
        this.container = new Container();

        // bind all service
        this.initModule();

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
     * Bind all query services
     */
    private bindQueries(): void {
        this.logger.debug("Binding query");
        this.container.bind<TrafficQueryService>("TrafficQueryService").to(TrafficQueryServiceImpl);
        this.container.bind<UserAuthenticationQueryService>("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
    }

    /**
     * Bind all controllers
     */
    private bindControllers(): void {
        this.logger.debug("Binding controllers");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(IndexController).whenTargetNamed("IndexController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(TrafficController).whenTargetNamed("TrafficController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(AuthenticationController).whenTargetNamed("AuthenticationController");
    }

    /**
     * Initialization of data base connection
     */
    private async initModule(): Promise<void> {
        this.logger.debug("Connect to database");
        await TypeORM.createConnection({
            autoSchemaSync: true,
            driver: {
                database: "metacity",
                host: "localhost",
                password: "metacity",
                port: 5432,
                type: "postgres",
                username: "metacity"
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
        this.bindDao();
        this.bindQueries();
        this.bindControllers();
        this.bindElasticClient();
        this.createServer();

    }

    /**
     * Instatiate a new server with specific configuration
     */
    private createServer(): void {
        const server = new InversifyExpressServer(this.container);
        server.setConfig((app) => {
            app.use(BodyParser.urlencoded({
                extended: true
            }));
            app.use(BodyParser.json());
            // Add static file server to serve angular resources
            const publicPath = Path.join(__dirname, "../../client/src");
            this.logger.debug("Static file location: '%s'", publicPath);
            app.use("/app", Express.static(publicPath));
            app.use(methodOverride());
            app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                if (/^\/app/.test(req.path)) {
                    res.sendFile(Path.join(__dirname, "../../client/src/index.html"));
                    return;
                }
                next();
            });
        });
        server.setErrorConfig((app) => {
            app.use((err: Error, req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                if (/^\/api/.test(req.path)) {
                    this.logger.error("An error occurred on api resources");
                    if (err instanceof IllegalArgumentError) {
                        res.status(HTTPStatusCodes.BAD_REQUEST).send({message: err.message});
                    } else if (err instanceof AccessDeniedError) {
                        res.status(HTTPStatusCodes.FORBIDDEN).send({message: err.message});
                    } else {
                        res.status(HTTPStatusCodes.INTERNAL_SERVER_ERROR).send({message: err.message});
                    }
                }
                next();
            });
        });
        this.expressServer = server.build();
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
    }

    /**
     * Bind all repositories
     *
     * @param connection
     */
    private bindRepository(connection: TypeORM.Connection): void {
        this.container.bind<TypeORM.Repository<User>>("UserRepository").toConstantValue(connection.entityManager.getRepository(User));
    }
}
