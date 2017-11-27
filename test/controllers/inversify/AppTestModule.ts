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
import { ClientControlManager } from "../../../src/common/security/ClientControlManager";
import { Role } from "../../../src/common/enum/Role";

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
        if (!ContextApp.container.isBound("ClientControlManagerMock")) {
            ContextApp.container.bind("ClientControlManagerMock").toConstantValue(TypeMoq.Mock.ofType<ClientControlManager>(ClientControlManager));
        }

        // Rebind all services
        ContextApp.container.rebind("TrafficQueryService").toConstantValue((ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).object);
        ContextApp.container.rebind("TweetQueryService").toConstantValue((ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).object);
        ContextApp.container.rebind("ClientControlManager").toConstantValue((ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).object);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

        return ContextApp.container;
    }

    public rebind(): void {
        ContextApp.container.rebind("TrafficQueryService").to(TrafficQueryServiceImpl);
        ContextApp.container.rebind("TweetQueryService").to(TweetQueryServiceImpl);
        ContextApp.container.rebind("ClientControlManager").to(ClientControlManager);
        if (ContextApp.container.isBound("ESClientMock")) {
            ContextApp.container.unbind("ESClientMock");
        }
    }
}
