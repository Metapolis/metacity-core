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

/**
 * Contains all information to build a range query
 * T have to be string (for date ISO86012) or number
 */
export class RangeQueryParam extends QueryParam {

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
     * Getter greater than equals value
     * @returns {number|string}
     */
    public getGTE() {
        return this.gte;
    }

    /**
     * Getter lower than equals value
     * @returns {number|string}
     */
    public getLTE() {
        return this.lte;
    }

    /**
     * Getter greater than value
     * @returns {number|string}
     */
    public getGT() {
        return this.gt;
    }

    /**
     * Getter lower than value
     * @returns {number|string}
     */
    public getLT() {
        return this.lt;
    }

    /**
     * Constructor for greater than equals and lower than equals of number
     * @param gte greater than equals
     * @param lte lower than equals
     */
    public createGTELTENumber(gte: number, lte: number) {
        this.gte = gte;
        this.lte = lte;
    }

    /**
     * Constructor for greater than equals and lower than of number
     * @param gte greater than equals
     * @param lt lower than
     */
    public createGTELTNumber(gte: number, lt: number) {
        this.gte = gte;
        this.lt = lt;
    }

    /**
     * Constructor for greater than equals and lower than equals of number
     * @param gt greater than
     * @param lte lower than equals
     */
    public createGTLTENumber(gt: number, lte: number) {
        this.gt = gt;
        this.lte = lte;
    }

    /**
     * Constructor for greater than equals and lower than equals of number
     * @param gt greater than
     * @param lt lower than
     */
    public createGTLTNumber(gt: number, lt: number) {
        this.gt = gt;
        this.lt = lt;
    }

    /**
     * Constructor for greater than equals and lower than equals of string
     * @param gte greater than equals
     * @param lte lower than equals
     */
    public createGTELTEString(gte: string, lte: string) {
        this.gte = gte;
        this.lte = lte;
    }

    /**
     * Constructor for greater than equals and lower than of string
     * @param gte greater than equals
     * @param lt lower than
     */
    public createGTELTString(gte: string, lt: string) {
        this.gte = gte;
        this.lt = lt;
    }

    /**
     * Constructor for greater than equals and lower than equals of string
     * @param gt greater than
     * @param lte lower than equals
     */
    public createGTLTEString(gt: string, lte: string) {
        this.gt = gt;
        this.lte = lte;
    }

    /**
     * Constructor for greater than equals and lower than equals of string
     * @param gt greater than
     * @param lt lower than
     */
    public createGTLTString(gt: string, lt: string) {
        this.gt = gt;
        this.lt = lt;
    }
}
