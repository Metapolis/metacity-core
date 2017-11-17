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

import { Query } from "./Query";
import { BoundingBoxTerm } from "./model/BoundingBoxTerm";
import { LocationPoint } from "../../../../common/LocationPoint";

/**
 * Contains bounding box query
 */
export class BoundingBoxQuery implements Query {
    /**
     * Bounding box map
     * @type {Map<string, BoundingBoxTerm>}
     */
    private geoBoundingBox: Map<string, BoundingBoxTerm> = new Map<string, BoundingBoxTerm>();

    /**
     * Constructor of the map
     * @param field
     * @param topLeft
     * @param bottomRight
     */
    constructor(field: string, topLeft: LocationPoint, bottomRight: LocationPoint) {
        const boundingBoxTerm = new BoundingBoxTerm(topLeft, bottomRight);
        this.geoBoundingBox.set(field, boundingBoxTerm);
    }

    /**
     * Render map
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"geo_bounding_box\" : {";
        for (const key of this.geoBoundingBox.keys()) {
            strQuery += "\"" + key + "\": " + this.geoBoundingBox.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
