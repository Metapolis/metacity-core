/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

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
import { getRepository } from "typeorm";
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
import { LocalAuthority } from "./persistence/domain/LocalAuthority";
import { LocalAuthorityDaoImpl } from "./persistence/dao/impl/LocalAuthorityDaoImpl";
import { LocalAuthorityDao } from "./persistence/dao/LocalAuthorityDao";
import { ContextApp } from "./ContextApp";
import { LocalAuthorityQueryService } from "./services/query/LocalAuthorityQueryService";
import { LocalAuthorityQueryServiceImpl } from "./services/query/impl/LocalAuthorityQueryServiceImpl";
import { Circle } from "./persistence/domain/Circle";
import { CircleCommandService } from "./services/command/CircleCommandService";
import { CircleCommandServiceImpl } from "./services/command/impl/CircleCommandServiceImpl";
import { LocalAuthorityController } from "./controllers/rest/LocalAuthorityController";
import { CircleDao } from "./persistence/dao/CircleDao";
import { CircleDaoImpl } from "./persistence/dao/impl/CircleDaoImpl";
import { UserCommandService } from "./services/command/UserCommandService";
import { UserCommandServiceImpl } from "./services/command/impl/UserCommandServiceImpl";
import { UserController } from "./controllers/rest/UserController";
import { NotFoundError } from "./common/error/NotFoundError";
import { CircleQueryService } from "./services/query/CircleQueryService";
import { CircleQueryServiceImpl } from "./services/query/impl/CircleQueryServiceImpl";
import { Credential } from "./persistence/domain/Credential";
import { PostgresNamingStrategy } from "./persistence/strategy/PostgresNamingStrategy";
import { DataSet } from "./persistence/domain/DataSet";
import { UserQueryService } from "./services/query/UserQueryService";
import { UserQueryServiceImpl } from "./services/query/impl/UserQueryServiceImpl";
import * as CORS from "cors";
import methodOverride = require("method-override");
import { UserControlManager } from "./security/UserControlManager";
import { ClientControlManager } from "./security/ClientControlManager";
import { CredentialDaoImpl } from "./persistence/dao/impl/CredentialDaoImpl";
import { CredentialDao } from "./persistence/dao/CredentialDao";
import * as Moment from "moment";
import { LocalAuthorityCommandService } from "./services/command/LocalAuthorityCommandService";
import { LocalAuthorityCommandServiceImpl } from "./services/command/impl/LocalAuthorityCommandServiceImpl";
import { DataSetQueryServiceImpl } from "./services/query/impl/DataSetQueryServiceImpl";
import { DataSetQueryService } from "./services/query/DataSetQueryService";
import { DataSetDaoImpl } from "./persistence/dao/impl/DataSetDaoImpl";
import { DataSetDao } from "./persistence/dao/DataSetDao";

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
     * Data base connection
     *
     * @type {Connection}
     */
    private dbConnection: TypeORM.Connection;

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
        this.container.bind<LocalAuthorityCommandService>("LocalAuthorityCommandService").to(LocalAuthorityCommandServiceImpl);
        this.container.bind<UserCommandService>("UserCommandService").to(UserCommandServiceImpl);
    }

    /**
     * Bind all query services
     */
    private bindQueries(): void {
        this.logger.debug("Binding query");
        this.container.bind<TrafficQueryService>("TrafficQueryService").to(TrafficQueryServiceImpl);
        this.container.bind<TweetQueryService>("TweetQueryService").to(TweetQueryServiceImpl);
        this.container.bind<LocalAuthorityQueryService>("LocalAuthorityQueryService").to(LocalAuthorityQueryServiceImpl);
        this.container.bind<UserAuthenticationQueryService>("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
        this.container.bind<CircleQueryService>("CircleQueryService").to(CircleQueryServiceImpl);
        this.container.bind<DataSetQueryService>("DataSetQueryService").to(DataSetQueryServiceImpl);
        this.container.bind<UserQueryService>("UserQueryService").to(UserQueryServiceImpl);
    }

    /**
     * Bind all controllers
     */
    private bindControllers(): void {
        this.logger.debug("Binding controllers");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(TrafficController).whenTargetNamed("TrafficController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(AuthenticationController).whenTargetNamed("AuthenticationController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(TweetController).whenTargetNamed("TweetController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(LocalAuthorityController).whenTargetNamed("LocalAuthorityController");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(UserController).whenTargetNamed("UserController");
    }

    /**
     * Initialization of app module
     */
    private async initModule(): Promise<void> {
        this.logger.debug("Connect to database");
        await this.connectDB();
        // Bind security manager
        this.container.bind<UserControlManager>("UserControlManager").to(UserControlManager);
        this.container.bind<ClientControlManager>("ClientControlManager").to(ClientControlManager);

        this.bindDao();
        this.bindCommands();
        this.bindQueries();
        this.bindControllers();
        this.bindElasticClient();
        this.createServer();
    }

    /**
     * Connect database (Public use to reconnect database)
     */
    public async connectDB(): Promise<void> {
        this.logger.debug("Connect to database");
        await TypeORM.createConnection({
            dropSchema: Config.isDatabaseDropSchema(),
            synchronize: Config.isDatabaseAutoSchemaSync(),
            namingStrategy: new PostgresNamingStrategy(),
            type: "postgres",
            database: Config.getDatabaseName(),
            host: Config.getDatabaseHost(),
            password: Config.getDatabasePassword(),
            port: Config.getDatabasePort(),
            username: Config.getDatabaseUser(),
            entities: [
                __dirname + "/persistence/domain/*.js"
            ],
        }).then((connection: TypeORM.Connection) => {
            this.logger.debug("Connexion to database succeed");
            this.logger.debug("Begin to bind all services");
            this.dbConnection = connection;
            this.bindRepository();
        }).catch((error) => {
            this.logger.error(error);
            this.logger.error("An error occurred during establishment database connection, server cannot be start");
            throw new Error("Database error server cannot be start");
        });
    }

    /**
     * Create a new server with specific configuration
     */
    private async createServer(): Promise<void> {
        const server = new InversifyExpressServer(this.container);
        server.setConfig((app) => {
            const expressWinston = require("express-winston");
            const context = require("request-context");
            app.use(context.middleware("request"));
            app.use(expressWinston.logger({
                transports: [
                    new (Winston.transports.Console)({
                        json: false,
                        colorize: true,
                        formatter: (options) => {
                            // Return string will be passed to logger.
                            const logProperties: string[] = [];
                            logProperties.push(Moment().toISOString(),
                                options.level.toUpperCase(),
                                App.name,
                                (options.message ? decodeURI(options.message) : ""),
                                (options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : ""));
                            return logProperties.join(" ");
                        },
                    })
                ],

                meta: false, // optional: control whether you want to log the meta data about the request (default to true)
                msg: "HTTP {{req.method}} {{req.url}} {{res.statusCode}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
                expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
                colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
                level: (req: Express.Request, res: Express.Response) => {
                    let level = "";
                    // Check if error is Ok (bigger than 200)
                    if (res.statusCode >= HTTPStatusCodes.OK) {
                        level = "info";
                    }
                    // Check if error is client error (bigger than 400)
                    if (res.statusCode >= HTTPStatusCodes.BAD_REQUEST) {
                        level = "warn";
                    }
                    // Check if error is server error (bigger than 500)
                    if (res.statusCode >= HTTPStatusCodes.INTERNAL_SERVER_ERROR) {
                        level = "error";
                    }
                    return level;
                }
            }));
            app.use(CORS());
            app.use(BodyParser.urlencoded({
                extended: true
            }));
            app.use(BodyParser.json());
            // Add static file server to serve angular resources
            const publicPath = Path.join(__dirname, "../../client/src");
            this.logger.debug("Static file location: '%s'", publicPath);
            app.use(CORS());
            app.use("/", Express.static(publicPath));
            app.use(methodOverride());
            app.use((req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
                context.set("request:req", req);
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
                    } else if (err instanceof NotFoundError) {
                        this.logger.error("Message: %s \n Stack: %s", err.message, err.stack);
                        res.status(HTTPStatusCodes.NOT_FOUND).send({message: err.message});
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
        this.container.bind<LocalAuthorityDao>("LocalAuthorityDao").to(LocalAuthorityDaoImpl);
        this.container.bind<CircleDao>("CircleDao").to(CircleDaoImpl);
        this.container.bind<DataSetDao>("DataSetDao").to(DataSetDaoImpl);
        this.container.bind<CredentialDao>("CredentialDao").to(CredentialDaoImpl);
    }

    /**
     * Bind all repositories
     */
    private bindRepository(): void {
        this.logger.debug("Binding repositories");
        this.container.bind<TypeORM.Repository<User>>("UserRepository").toConstantValue(getRepository(User));
        this.container.bind<TypeORM.Repository<Circle>>("CircleRepository").toConstantValue(getRepository(Circle));
        this.container.bind<TypeORM.Repository<LocalAuthority>>("LocalAuthorityRepository").toConstantValue(getRepository(LocalAuthority));
        this.container.bind<TypeORM.Repository<Credential>>("CredentialRepository").toConstantValue(getRepository(Credential));
        this.container.bind<TypeORM.Repository<DataSet>>("DataSetRepository").toConstantValue(getRepository(DataSet));
    }

    /**
     * Get database connection (Use to disconnect database)
     *
     * @returns {Connection} database connection
     */
    public getDataBaseConnection(): TypeORM.Connection {
        return this.dbConnection;
    }
}
