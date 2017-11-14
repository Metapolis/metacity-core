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

import { RangeQueryParam } from "./RangeQueryParam";

/**
 * Represents { "gte": 10, "lte": 20 } for e.g.
 */
export class RangeTerm {
    /**
     * Limit greater than or equals
     */
    private gte: number | string;

    /**
     * Limit lower than or equals
     */
    private lte: number | string;

    /**
     * Limit greater than
     */
    private gt: number | string;

    /**
     * Limit lower than
     */
    private lt: number | string;

    /**
     * Constructor
     *
     * @param rangeQueryParam range query param use to create a range term
     */
    constructor(rangeQueryParam: RangeQueryParam) {
        this.gte = rangeQueryParam.getGTE();
        this.lte = rangeQueryParam.getLTE();
        this.gt = rangeQueryParam.getGT();
        this.lt = rangeQueryParam.getLT();
    }

    /**
     * Generate json from class
     * @returns {string}
     */
    public render(): string {
        const gte = this.gte !== undefined ? this.gte : undefined;
        const gt = this.gt !== undefined ? this.gt : undefined;
        const lte = this.lte !== undefined ? this.lte : undefined;
        const lt = this.lt !== undefined ? this.lt : undefined;

        const jsonQuery = {
            gte: gte,
            lte: lte,
            gt: gt,
            lt: lt
        };
        return JSON.stringify(jsonQuery);
    }
}
