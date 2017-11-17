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

import { App } from "../src/App";
import { Container } from "inversify";
import { isNullOrUndefined } from "util";

/**
 * Context app use to launch just one time server
 */
export class ContextApp {

    /**
     * App Metacity core
     *
     * @type {App}
     */
    public static app: App;

    /**
     * Container inversify
     *
     * @type {Container}
     */
    public static container: Container;

    public static async init(): Promise<void> {
        if (isNullOrUndefined(ContextApp.container) && isNullOrUndefined(ContextApp.app)) {
            ContextApp.app  = new App();
            ContextApp.container = await ContextApp.app.bootstrap();
        }
    }
}
