import { Client } from "elasticsearch";
import { Container } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";

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
        ContextApp.container.rebind("UserDao").toConstantValue((ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
