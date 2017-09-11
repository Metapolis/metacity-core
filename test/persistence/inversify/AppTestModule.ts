import { Client } from "elasticsearch";
import { Container } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";
import { CollectivityDaoImpl } from "../../../src/persistence/dao/impl/CollectivityDaoImpl";
import { CollectivityDao } from "../../../src/persistence/dao/CollectivityDao";

export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    public bootstrap(): Container {
        ContextApp.init();
        return ContextApp.container;
    }
}
