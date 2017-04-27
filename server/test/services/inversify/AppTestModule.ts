import {App} from "../../../src/App";
import {Client} from "elasticsearch";
import {Container} from "inversify";
import {LoggerInstance} from "winston";
import {Utils} from "../../../src/common/Utils";
import {Mock} from "moq.ts";
import {ContextApp} from "../../ContextApp";

export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    public bootstrap(): Container {
        AppTestModule.logger.debug("disable some services");
        // Disable elasticsearch client
        // Second time for ESClientMock need to rebind ESClientMock
        ContextApp.container.rebind("ESClientMock").toConstantValue(new Mock<Client>());
        ContextApp.container.rebind("ESClient").toConstantValue((ContextApp.container.get("ESClientMock") as Mock<Client>).object());

        return ContextApp.container;
    }
}
