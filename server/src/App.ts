import errorHandler = require("errorhandler");
import {LoggerInstance} from "winston";
import methodOverride = require("method-override");
import {Client} from "elasticsearch";
import {Container} from "inversify";
import {interfaces, InversifyExpressServer, TYPE} from "inversify-express-utils";
import {IndexController} from "./controllers/IndexController";
import {Utils} from "./common/Utils";
import {TrafficQueryServiceImpl} from "./services/query/impl/TrafficQueryServiceImpl";
import {TrafficQueryService} from "./services/query/TrafficQueryService";

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
        this.bindQueries();
        this.bindControllers();
        this.bindElasticClient();

        // create server
        const server = new InversifyExpressServer(this.container);
        server
            .build()
            .listen(3000, "localhost");
        this.logger.info("Server launched");

        return this.container;
    }

    /**
     * Bind the elastic search client
     */
    private bindElasticClient() {
        this.logger.debug("Create ElasticSearch client");
        // Create the elasticSearch client
        const elasticClient = new Client({
            host: "localhost:9200",
            log: "error",
        });
        elasticClient.ping({
            requestTimeout: 3000,
        }, (error) => {
            if (error) {
                this.logger.error("ElasticSearch cluster is down!");
                this.logger.error("Several features part will not work");
            } else {
                this.logger.debug("ElasticSearch cluster is well!");
            }
        });
        this.logger.debug("ElasticSearch client connected");

        this.logger.debug("Binding ElasticSearch client");
        this.container.bind<Client>("ESClient").toConstantValue(elasticClient);
    }

    /**
     * Bind all query services
     */
    private bindQueries() {
        this.logger.debug("Binding query");
        this.container.bind<TrafficQueryService>("TrafficQueryService").to(TrafficQueryServiceImpl);
    }

    /**
     * Bind all controllers
     */
    private bindControllers() {
        this.logger.debug("Binding controller");
        this.container.bind<interfaces.Controller>(TYPE.Controller).to(IndexController).whenTargetNamed("IndexController");
    }

}
