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

import { Container } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../src/common/Utils";
import { ContextApp } from "../../ContextApp";

export class AppTestModule {

    /**
     * AppTestModule logger
     *
     * @type {winston.LoggerInstance}
     */
    private static logger: LoggerInstance = Utils.createLogger(AppTestModule.name);

    /**
     * Bootstrap application for testing
     * @returns {Container}
     */
    public bootstrap(): Container {
        ContextApp.init();
        return ContextApp.container;
    }

    /**
     * Reconnect database
     */
    public async reconnectDB(): Promise<void> {
        AppTestModule.logger.debug("Unbinding repositories");
        // Unbind all repository
        ContextApp.container.unbind("UserRepository");
        ContextApp.container.unbind("CircleRepository");
        ContextApp.container.unbind("LocalAuthorityRepository");
        ContextApp.container.unbind("CredentialRepository");

        // Reconnect database
        AppTestModule.logger.debug("Disconnect database");
        await ContextApp.app.getDataBaseConnection().close();

        AppTestModule.logger.debug("Connect database");
        await ContextApp.app.connectDB();
    }
}
