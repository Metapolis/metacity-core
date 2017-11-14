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

import { RangeTerm } from "./model/RangeTerm";
import { RangeQueryParam } from "./model/RangeQueryParam";
import { Query } from "./Query";

/**
 * Range query to check if element is inner start and end element (lt(e) > element > gt(e))
 */
export class RangeQuery implements Query {

    /**
     * Map of term per field
     * @type {Map<string, RangeTerm>}
     */
    private range: Map<string, RangeTerm> = new Map<string, RangeTerm>();

    /**
     * Constructor
     *
     * @param field search field query
     * @param rangeQueryParam range query param used to build query
     */
    constructor(field: string, rangeQueryParam: RangeQueryParam) {
        const rangeTerm = new RangeTerm(rangeQueryParam);
        this.range.set(field, rangeTerm);
    }

    /**
     * render function
     *
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"range\" : {";
        for (const key of this.range.keys()) {
            strQuery += "\"" + key + "\": " + this.range.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
