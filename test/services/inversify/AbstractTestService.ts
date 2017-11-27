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
import { ContextApp } from "../../ContextApp";
import { CredentialDaoImpl } from "../../../src/persistence/dao/impl/CredentialDaoImpl";
import * as TypeMoq from "typemoq";

export abstract class AbstractTestService {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Application test container
     */
    private static container: Container;

    /**
     * Method launched before test execution
     */
    public static before(): void {
        AbstractTestService.app = new AppTestModule();
        AbstractTestService.container = AbstractTestService.app.bootstrap();
    }

    /**
     * Method launched before test execution
     */
    public static after(): void {
        AbstractTestService.app.rebind();
    }

    /**
     * Use to rest all mock after each test
     */
    public async after(): Promise<void> {
        // Reset all mock services
        (ContextApp.container.get("CredentialDaoMock") as TypeMoq.IMock<CredentialDaoImpl>).reset();

    }
}
