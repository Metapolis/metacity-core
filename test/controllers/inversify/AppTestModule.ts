/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

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
import { UserCommandServiceImpl } from "../../../src/services/command/impl/UserCommandServiceImpl";
import { UserDaoImpl } from "../../../src/persistence/dao/impl/UserDaoImpl";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { CircleDaoImpl } from "../../../src/persistence/dao/impl/CircleDaoImpl";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { CircleCommandServiceImpl } from "../../../src/services/command/impl/CircleCommandServiceImpl";
import { CircleQueryServiceImpl } from "../../../src/services/query/impl/CircleQueryServiceImpl";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { UserQueryServiceImpl } from "../../../src/services/query/impl/UserQueryServiceImpl";
import { UserQueryService } from "../../../src/services/query/UserQueryService";
import { LocalAuthorityQueryService } from "../../../src/services/query/LocalAuthorityQueryService";
import { LocalAuthorityQueryServiceImpl } from "../../../src/services/query/impl/LocalAuthorityQueryServiceImpl";
import { ClientControlManager } from "../../../src/security/ClientControlManager";
import { Role } from "../../../src/common/enum/Role";
import { CredentialDao } from "../../../src/persistence/dao/CredentialDao";
import { CredentialDaoImpl } from "../../../src/persistence/dao/impl/CredentialDaoImpl";
import { LocalAuthorityCommandServiceImpl } from "../../../src/services/command/impl/LocalAuthorityCommandServiceImpl";
import { LocalAuthorityCommandService } from "../../../src/services/command/LocalAuthorityCommandService";
import { DataSetQueryService } from "../../../src/services/query/DataSetQueryService";
import { DataSetQueryServiceImpl } from "../../../src/services/query/impl/DataSetQueryServiceImpl";
import { DataSetDao } from "../../../src/persistence/dao/DataSetDao";
import { DataSetDaoImpl } from "../../../src/persistence/dao/impl/DataSetDaoImpl";
import { DataSetCommandService } from "../../../src/services/command/DataSetCommandService";
import { DataSetCommandServiceImpl } from "../../../src/services/command/impl/DataSetCommandServiceImpl";

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
        if (!ContextApp.container.isBound("UserQueryServiceMock")) {
            ContextApp.container.bind("UserQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<UserQueryService>(UserQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("CircleCommandServiceMock")) {
            ContextApp.container.bind("CircleCommandServiceMock").toConstantValue(TypeMoq.Mock.ofType<CircleCommandService>(CircleCommandServiceImpl));
        }
        if (!ContextApp.container.isBound("DataSetCommandServiceMock")) {
            ContextApp.container.bind("DataSetCommandServiceMock").toConstantValue(TypeMoq.Mock.ofType<DataSetCommandService>(DataSetCommandServiceImpl));
        }
        if (!ContextApp.container.isBound("CircleQueryServiceMock")) {
            ContextApp.container.bind("CircleQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<CircleQueryService>(CircleQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("DataSetQueryServiceMock")) {
            ContextApp.container.bind("DataSetQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<DataSetQueryService>(DataSetQueryServiceImpl));
        }
        if (!ContextApp.container.isBound("LocalAuthorityCommandServiceMock")) {
            ContextApp.container.bind("LocalAuthorityCommandServiceMock").toConstantValue(TypeMoq.Mock.ofType<LocalAuthorityCommandService>(LocalAuthorityCommandServiceImpl));
        }
        if (!ContextApp.container.isBound("LocalAuthorityQueryServiceMock")) {
            ContextApp.container.bind("LocalAuthorityQueryServiceMock").toConstantValue(TypeMoq.Mock.ofType<LocalAuthorityQueryService>(LocalAuthorityQueryServiceImpl));
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
        if (!ContextApp.container.isBound("DataSetDaoMock")) {
            ContextApp.container.bind("DataSetDaoMock").toConstantValue(TypeMoq.Mock.ofType<DataSetDao>(DataSetDaoImpl));
        }
        if (!ContextApp.container.isBound("CredentialDaoMock")) {
            ContextApp.container.bind("CredentialDaoMock").toConstantValue(TypeMoq.Mock.ofType<CredentialDao>(CredentialDaoImpl));
        }
        if (!ContextApp.container.isBound("ClientControlManagerMock")) {
            ContextApp.container.bind("ClientControlManagerMock").toConstantValue(TypeMoq.Mock.ofType<ClientControlManager>(ClientControlManager));
        }

        // Rebind all services
        ContextApp.container.rebind("UserDao").toConstantValue((ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDaoImpl>).object);
        ContextApp.container.rebind("LocalAuthorityDao").toConstantValue((ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDaoImpl>).object);
        ContextApp.container.rebind("CircleDao").toConstantValue((ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDaoImpl>).object);
        ContextApp.container.rebind("DataSetDao").toConstantValue((ContextApp.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDaoImpl>).object);
        ContextApp.container.rebind("UserAuthenticationQueryService").toConstantValue((ContextApp.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>).object);
        ContextApp.container.rebind("UserQueryService").toConstantValue((ContextApp.container.get("UserQueryServiceMock") as TypeMoq.IMock<UserQueryService>).object);
        ContextApp.container.rebind("CircleCommandService").toConstantValue((ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>).object);
        ContextApp.container.rebind("DataSetCommandService").toConstantValue((ContextApp.container.get("DataSetCommandServiceMock") as TypeMoq.IMock<DataSetCommandService>).object);
        ContextApp.container.rebind("CircleQueryService").toConstantValue((ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>).object);
        ContextApp.container.rebind("DataSetQueryService").toConstantValue((ContextApp.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>).object);
        ContextApp.container.rebind("LocalAuthorityCommandService").toConstantValue((ContextApp.container.get("LocalAuthorityCommandServiceMock") as TypeMoq.IMock<LocalAuthorityCommandService>).object);
        ContextApp.container.rebind("LocalAuthorityQueryService").toConstantValue((ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>).object);
        ContextApp.container.rebind("UserCommandService").toConstantValue((ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>).object);
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).object);
        ContextApp.container.rebind("TweetQueryService").toConstantValue((ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).object);
        ContextApp.container.rebind("ClientControlManager").toConstantValue((ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("UserDao").to(UserDaoImpl);
        ContextApp.container.rebind("LocalAuthorityDao").to(LocalAuthorityDaoImpl);
        ContextApp.container.rebind("CircleDao").to(CircleDaoImpl);
        ContextApp.container.rebind("DataSetDao").to(DataSetDaoImpl);
        ContextApp.container.rebind("CredentialDao").to(CredentialDaoImpl);
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        ContextApp.container.rebind("TweetQueryService").to(TweetQueryServiceImpl);
        ContextApp.container.rebind("UserAuthenticationQueryService").to(UserAuthenticationQueryServiceImpl);
        ContextApp.container.rebind("UserQueryService").to(UserQueryServiceImpl);
        ContextApp.container.rebind("CircleCommandService").to(CircleCommandServiceImpl);
        ContextApp.container.rebind("DataSetCommandService").to(DataSetCommandServiceImpl);
        ContextApp.container.rebind("CircleQueryService").to(CircleQueryServiceImpl);
        ContextApp.container.rebind("DataSetQueryService").to(DataSetQueryServiceImpl);
        ContextApp.container.rebind("LocalAuthorityCommandService").to(LocalAuthorityCommandServiceImpl);
        ContextApp.container.rebind("LocalAuthorityQueryService").to(LocalAuthorityQueryServiceImpl);
        ContextApp.container.rebind("UserCommandService").to(UserCommandServiceImpl);
        ContextApp.container.rebind("ClientControlManager").to(ClientControlManager);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
