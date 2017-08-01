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
import { UserAuthenticationQueryService } from "../../../src/services/query/UserAuthenticationQueryService";
import { UserAuthenticationQueryServiceImpl } from "../../../src/services/query/impl/UserAuthenticationQueryServiceImpl";
import { CollectivityDao } from "../../../src/persistence/dao/CollectivityDao";
import { CollectivityDaoImpl } from "../../../src/persistence/dao/impl/CollectivityDaoImpl";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";
import { UserDao } from "../../../src/persistence/dao/UserDao";
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
        if (!ContextApp.container.isBound("UserAuthenticationQueryServiceMock")) {
            ContextApp.container.bind("UserAuthenticationQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<UserAuthenticationQueryService>(UserAuthenticationQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("CollectivityDaoMock")) {
            ContextApp.container.bind("CollectivityDaoMock").toConstantValue(TypeMoq.Mock.ofType<CollectivityDao>(CollectivityDaoImpl));
        }
        if (!ContextApp.container.isBound("UserDaoMock")) {
            ContextApp.container.bind("UserDaoMock").toConstantValue(TypeMoq.Mock.ofType<UserDao>(UserDaoImpl));
        }

        ContextApp.container.rebind("UserDao").toConstantValue((ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDaoImpl>).object);
        ContextApp.container.rebind("CollectivityDao").toConstantValue((ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDaoImpl>).object);
        ContextApp.container.rebind("UserAuthenticationQueryService").toConstantValue((ContextApp.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>).object);
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).object);
        ContextApp.container.rebind("TweetQueryService").toConstantValue((ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("UserDao").to(UserDaoImpl);
        ContextApp.container.rebind("CollectivityDao").to(CollectivityDaoImpl);
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        ContextApp.container.rebind("TweetQueryService").to(TweetQueryServiceImpl);
        ContextApp.container.rebind("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
