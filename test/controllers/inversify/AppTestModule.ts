import { Client } from "elasticsearch";
import { Container } from "inversify";
import { TrafficQueryService } from "../../../src/services/query/TrafficQueryService";
import { TrafficQueryServiceImpl } from "../../../src/services/query/impl/TrafficQueryServiceImpl";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import { TweetQueryService } from "../../../src/services/query/TweetQueryService";
import { TweetQueryServiceImpl } from "../../../src/services/query/impl/TweetQueryServiceImpl";
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
    public async bootstrap(): Promise<Container> {
        await ContextApp.init();
        // Disable elasticsearch client (First execution bind mock)
        ContextApp.container.bind("ESClientMock").toConstantValue(TypeMoq.Mock.ofType(Client));
        ContextApp.container.rebind("ESClient").toConstantValue((ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>).object);

        // Disable all services
        if (!ContextApp.container.isBound("TrafficQueryServiceMock")) {
            ContextApp.container.bind("TrafficQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<TrafficQueryService>(TrafficQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("TweetQueryServiceMock")) {
            ContextApp.container.bind("TweetQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<TweetQueryService>(TweetQueryServiceImpl));
        }
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).object);
        ContextApp.container.rebind("TweetQueryService").toConstantValue((ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        ContextApp.container.rebind("TweetQueryService").to(TweetQueryServiceImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
