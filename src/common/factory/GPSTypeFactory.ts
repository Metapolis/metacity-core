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

import { GPSType } from "../enum/accident/GPSType";
import { UnsupportedOperationError } from "../error/UnsupportedOperationError";

/**
 * Factory use to create GPSType
 */
export class GPSTypeFactory {

    /**
     * Define binding with metropole value
     *
     * @type {string}
     */
    private static METROPOLE: string = "M";

    /**
     * Define binding with antille value
     *
     * @type {string}
     */
    private static ANTILLE: string = "A";

    /**
     * Define binding with guyane value
     *
     * @type {string}
     */
    private static GUYANE: string = "G";

    /**
     * Define binding with reunion value
     *
     * @type {string}
     */
    private static REUNION: string = "R";

    /**
     * Define binding with mayotte value
     *
     * @type {string}
     */
    private static MAYOTTE: string = "Y";

    /**
     * Get GPSType from string value ("M", "A", "G", "R", "Y")
     *
     * @param value
     *
     * @return {GPSType}
     */
    public static getGpsType(value: string): GPSType {
        switch (value) {
            case GPSTypeFactory.METROPOLE:
                return GPSType.METROPOLE;
            case GPSTypeFactory.ANTILLE:
                return GPSType.ANTILLE;
            case GPSTypeFactory.GUYANE:
                return GPSType.GUYANNE;
            case GPSTypeFactory.REUNION:
                return GPSType.REUNION;
            case GPSTypeFactory.MAYOTTE:
                return GPSType.MAYOTTE;
            default:
                throw new UnsupportedOperationError("'" + value + "' is not supported");
        }
    }
}
