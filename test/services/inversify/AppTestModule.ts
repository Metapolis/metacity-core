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
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { CredentialDao } from "../../../src/persistence/dao/CredentialDao";
import { CredentialDaoImpl } from "../../../src/persistence/dao/impl/CredentialDaoImpl";

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
        if (!ContextApp.container.isBound("CredentialDaoMock")) {
            ContextApp.container.bind("CredentialDaoMock").toConstantValue(TypeMoq.Mock.ofType(CredentialDaoImpl));
        }
        ContextApp.container.rebind("CredentialDao").toConstantValue((ContextApp.container.get("CredentialDaoMock") as TypeMoq.IMock<CredentialDaoImpl>).object);

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("CredentialDao").to(CredentialDaoImpl);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
