import { Client } from "elasticsearch";
import { Container } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";
import { LocalAuthorityDaoImpl } from "../../../src/persistence/dao/impl/LocalAuthorityDaoImpl";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { CircleDaoImpl} from "../../../src/persistence/dao/impl/CircleDaoImpl";
import { CircleDao} from "../../../src/persistence/dao/CircleDao";

export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    public bootstrap(): Container {
        ContextApp.init();
        AppTestModule.logger.debug("disable some services");
        // Disable elasticsearch client
        // Second time for ESClientMock need to rebind ESClientMock
        ContextApp.container.bind("ESClientMock").toConstantValue(TypeMoq.Mock.ofType(Client));
        ContextApp.container.rebind("ESClient").toConstantValue((ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>).object);

        // Disable DAO
        if (!ContextApp.container.isBound("UserDaoMock")) {
            ContextApp.container.bind("UserDaoMock").toConstantValue(TypeMoq.Mock.ofType(UserDaoImpl));
        }
        if (!ContextApp.container.isBound("CircleDaoMock")) {
            ContextApp.container.bind("CircleDaoMock").toConstantValue(TypeMoq.Mock.ofType(CircleDaoImpl));
        }
        if (!ContextApp.container.isBound("LocalAuthorityDaoMock")) {
            ContextApp.container.bind("LocalAuthorityDaoMock").toConstantValue(TypeMoq.Mock.ofType<LocalAuthorityDao>(LocalAuthorityDaoImpl));
        }
        ContextApp.container.rebind("LocalAuthorityDao").toConstantValue((ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDaoImpl>).object);
        ContextApp.container.rebind("UserDao").toConstantValue((ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>).object);
        ContextApp.container.rebind("CircleDao").toConstantValue((ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("LocalAuthorityDao").to(LocalAuthorityDaoImpl);
        ContextApp.container.rebind("CircleDao").to(CircleDaoImpl);
        ContextApp.container.rebind("UserDao").to(UserDaoImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
