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

import { QueryParam } from "./QueryParam";
import { LocationPoint } from "../../../../../common/LocationPoint";

/**
 * Contains all information to build query for a bounding box
 */
export class BoundingBoxQueryParam extends QueryParam {

    /**
     * Point on corner top left in rectangle
     */
    public topLeft: LocationPoint;

    /**
     * Point on corner bottom right in rectangle
     */
    public bottomRight: LocationPoint;

    /**
     * Constructor
     *
     * @param field search field name
     * @param topLeft corner top left
     * @param bottomRight corner bottom right
     */
    constructor(field?: string, topLeft?: LocationPoint, bottomRight?: LocationPoint) {
        super();
        this.field = field;
        this.topLeft = topLeft;
        this.bottomRight = bottomRight;
    }
}
