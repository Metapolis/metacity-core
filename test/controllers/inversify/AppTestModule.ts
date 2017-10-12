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
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthorityDaoImpl } from "../../../src/persistence/dao/impl/LocalAuthorityDaoImpl";
import { UserCommandService } from "../../../src/services/command/UserCommandService";
import { UserCommandServiceImpl} from "../../../src/services/command/impl/UserCommandServiceImpl";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { CircleDaoImpl } from "../../../src/persistence/dao/impl/CircleDaoImpl";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { CircleCommandServiceImpl } from "../../../src/services/command/impl/CircleCommandServiceImpl";
import { CircleQueryServiceImpl } from "../../../src/services/query/impl/CircleQueryServiceImpl";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";

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
        if (!ContextApp.container.isBound("CircleCommandServiceMock")) {
            ContextApp.container.bind("CircleCommandServiceMock").toConstantValue(TypeMoq.Mock.ofType<CircleCommandService>(CircleCommandServiceImpl));
        }
        if (!ContextApp.container.isBound("CircleQueryServiceMock")) {
            ContextApp.container.bind("CircleQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<CircleQueryService>(CircleQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("UserCommandServiceMock")) {
            ContextApp.container.bind("UserCommandServiceMock").toConstantValue(TypeMoq.Mock.ofType<UserCommandService>(UserCommandServiceImpl));
        }
        if (!ContextApp.container.isBound("LocalAuthorityDaoMock")) {
            ContextApp.container.bind("LocalAuthorityDaoMock").toConstantValue(TypeMoq.Mock.ofType<LocalAuthorityDao>(LocalAuthorityDaoImpl));
        }
        if (!ContextApp.container.isBound("UserDaoMock")) {
            ContextApp.container.bind("UserDaoMock").toConstantValue(TypeMoq.Mock.ofType<UserDao>(UserDaoImpl));
        }
        if (!ContextApp.container.isBound("CircleDaoMock")) {
            ContextApp.container.bind("CircleDaoMock").toConstantValue(TypeMoq.Mock.ofType<CircleDao>(CircleDaoImpl));
        }

        // Rebind all services
        ContextApp.container.rebind("UserDao").toConstantValue((ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDaoImpl>).object);
        ContextApp.container.rebind("LocalAuthorityDao").toConstantValue((ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDaoImpl>).object);
        ContextApp.container.rebind("CircleDao").toConstantValue((ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDaoImpl>).object);
        ContextApp.container.rebind("UserAuthenticationQueryService").toConstantValue((ContextApp.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>).object);
        ContextApp.container.rebind("CircleCommandService").toConstantValue((ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>).object);
        ContextApp.container.rebind("CircleQueryService").toConstantValue((ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>).object);
        ContextApp.container.rebind("UserCommandService").toConstantValue((ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>).object);
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).object);
        ContextApp.container.rebind("TweetQueryService").toConstantValue((ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("UserDao").to(UserDaoImpl);
        ContextApp.container.rebind("LocalAuthorityDao").to(LocalAuthorityDaoImpl);
        ContextApp.container.rebind("CircleDao").to(CircleDaoImpl);
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        ContextApp.container.rebind("TweetQueryService").to(TweetQueryServiceImpl);
        ContextApp.container.rebind("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
        ContextApp.container.rebind("CircleCommandService").to(CircleCommandServiceImpl);
        ContextApp.container.rebind("CircleQueryService").to(CircleQueryServiceImpl);
        ContextApp.container.rebind("UserCommandService").to(UserCommandServiceImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
