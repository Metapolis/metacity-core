import { Container } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import { ContextApp } from "../../ContextApp";

export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    /**
     * Bootstrap application for testing
     * @returns {Container}
     */
    public bootstrap(): Container {
        ContextApp.init();
        return ContextApp.container;
    }

    /**
     * Reconnect database
     */
    public async reconnectDB(): Promise<void> {
        AppTestModule.logger.debug("Unbinding repositories");
        // Unbind all repository
        ContextApp.container.unbind("UserRepository");
        ContextApp.container.unbind("ActivityCircleRepository");
        ContextApp.container.unbind("CollectivityRepository");

        // Reconnect database
        AppTestModule.logger.debug("Disconnect database");
        await ContextApp.app.getDataBaseConnection().close();

        AppTestModule.logger.debug("Connect database");
        await ContextApp.app.connectDB();
    }
}
