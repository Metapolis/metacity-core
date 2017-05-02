import {Client} from "elasticsearch";
import {Container} from "inversify";
import {TrafficQueryService} from "../../../src/services/query/TrafficQueryService";
import {TrafficQueryServiceImpl} from "../../../src/services/query/impl/TrafficQueryServiceImpl";
import {Mock} from "moq.ts";
import {LoggerInstance} from "winston";
import {Utils} from "../../../src/common/Utils";
import {ContextApp} from "../../ContextApp";

/**
 * App test module
 */
export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    /**
     * Bootstrap app test module
     *
     * @returns {Container}
     */
    public bootstrap(): Container {
        // Disable elasticsearch client (First execution bind mock)
        ContextApp.container.bind("ESClientMock").toConstantValue(new Mock<Client>());
        ContextApp.container.rebind("ESClient").toConstantValue((ContextApp.container.get("ESClientMock") as Mock<Client>).object());

        // Disable all services
        ContextApp.container.bind("TrafficQueryServiceMock").toConstantValue(new Mock<TrafficQueryServiceImpl>());
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as Mock<TrafficQueryServiceImpl>).object());

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
