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

import { LocationPoint } from "./LocationPoint";

/**
 * Geo shape used to filter geo json
 */
export class GeoShape {

    /**
     * Top left point of shape
     */
    private topLeft: LocationPoint;

    /**
     * Bottom right point of shape
     */
    private bottomRight: LocationPoint;

    /**
     * Constructs geo shape
     * @param topLeft Left up point of shape
     * @param bottomRight Right down point of shape
     */
    constructor(topLeft: LocationPoint, bottomRight: LocationPoint) {
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }

    /**
     * Gets Parameters that top left appear
     *
     * @return Value of Parameters that topLeft appear
     */
    public getTopLeft(): LocationPoint {
        return this.topLeft;
    }

    /**
     * Gets Parameters that bottomRight appear
     *
     * @return Value of Parameters that bottomRight appear
     */
    public getBottomRight(): LocationPoint {
        return this.bottomRight;
    }
}
