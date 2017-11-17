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

import { LocationPoint } from "../../../../../common/LocationPoint";

/**
 * Represents {
 *              "top_left": [46.1859966659, -1.0898875706],
 *              "bottom_right": [46.1210972935, -1.246080447]
 *            }
 */

export class BoundingBoxTerm {

    /**
     * Top left point on the box [lon, lat]
     */
    private topLeft: [number, number];

    /**
     * Bottom right point on the box [lon,lat]
     */
    private bottomRight: [number, number];

    /**
     * Class constructor
     * @param topLeft
     * @param bottomRight
     */
    constructor(topLeft: LocationPoint, bottomRight: LocationPoint) {
        this.topLeft = [topLeft.getLongitudeParams(), topLeft.getLatitudeParams()];
        this.bottomRight = [bottomRight.getLongitudeParams(), bottomRight.getLatitudeParams()];
    }

    /**
     * Generate the json for the bounding box term
     * @returns {string}
     */
    public render(): string {
        const jsonQuery = {
            top_left: this.topLeft,
            bottom_right: this.bottomRight
        };
        return JSON.stringify(jsonQuery);
    }

}
