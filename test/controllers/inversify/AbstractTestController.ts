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

import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";
import { Container } from "inversify";
import { TrafficQueryService } from "../../../src/services/query/TrafficQueryService";
import { TweetQueryService } from "../../../src/services/query/TweetQueryService";
import { UserAuthenticationQueryService } from "../../../src/services/query/UserAuthenticationQueryService";
import { UserQueryService } from "../../../src/services/query/UserQueryService";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { UserCommandService } from "../../../src/services/command/UserCommandService";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import * as TypeMoq from "typemoq";
import { ClientControlManager } from "../../../src/security/ClientControlManager";
import { CredentialDao } from "../../../src/persistence/dao/CredentialDao";
import { LocalAuthorityCommandService } from "../../../src/services/command/LocalAuthorityCommandService";
import { LocalAuthorityQueryService } from "../../../src/services/query/LocalAuthorityQueryService";
import { DataSetQueryService } from "../../../src/services/query/DataSetQueryService";
import { DataSetDao } from "../../../src/persistence/dao/DataSetDao";
import { DataSetCommandService } from "../../../src/services/command/DataSetCommandService";
import { HttpLocalAuthorityProvider } from "../../../src/security/HttpLocalAuthorityProvider";

/**
 * Abstract controller
 */
export abstract class AbstractTestController {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Application testing
     */
    private static container: Container;

    /**
     * Backend
     *
     * @type {string}
     */
    private static backend: string = "http://localhost:3000";

    /**
     * Method launched before test execution
     */
    public static async before(): Promise<void> {
        AbstractTestController.app = new AppTestModule();
        AbstractTestController.container = await AbstractTestController.app.bootstrap();
    }

    /**
     * Method launched after test execution
     */
    public static after(): void {
        AbstractTestController.app.rebind();
    }

    /**
     * Use to rest all mock after each test
     */
    public after(): void {
        // Reset all mock services
        (AbstractTestController.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).reset();
        (AbstractTestController.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).reset();
        (AbstractTestController.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>).reset();
        (AbstractTestController.container.get("UserQueryServiceMock") as TypeMoq.IMock<UserQueryService>).reset();
        (AbstractTestController.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>).reset();
        (AbstractTestController.container.get("DataSetCommandServiceMock") as TypeMoq.IMock<DataSetCommandService>).reset();
        (AbstractTestController.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>).reset();
        (AbstractTestController.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>).reset();
        (AbstractTestController.container.get("LocalAuthorityCommandServiceMock") as TypeMoq.IMock<LocalAuthorityCommandService>).reset();
        (AbstractTestController.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>).reset();
        (AbstractTestController.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>).reset();
        (AbstractTestController.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>).reset();
        (AbstractTestController.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>).reset();
        (AbstractTestController.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>).reset();
        (AbstractTestController.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDao>).reset();
        (AbstractTestController.container.get("CredentialDaoMock") as TypeMoq.IMock<CredentialDao>).reset();
        (AbstractTestController.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).reset();
        (AbstractTestController.container.get("HttpLocalAuthorityProviderMock") as TypeMoq.IMock<HttpLocalAuthorityProvider>).reset();
    }

    /**
     * Get backend
     *
     * @returns {string}
     */
    public static getBackend(): string {
        return this.backend;
    }
}
