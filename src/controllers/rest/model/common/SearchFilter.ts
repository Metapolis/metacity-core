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

import { Utils } from "../../../../common/Utils";

/**
 * Represent a filter used in search
 */
export class SearchFilter {

    /**
     * Split must and should value
     *
     * @type {string}
     */
    private static MAIN_SPLITTER_CHAR: string = ";";

    /**
     * Minimum main part element (MUST, SHOULD)
     *
     * @type {number}
     */
    private static MAXIMUM_MAIN_PART: number = 2;

    /**
     * Split element in filter
     * @type {string}
     */
    private static EXPRESSION_SPLITTER_CHAR: string = ",";

    /**
     * Logical must values
     *
     * @type {Array}
     */
    private mustValues: string[] = [];

    /**
     * Logical should values
     * @type {Array}
     */
    private shouldValues: string[] = [];

    /**
     * Construct filter from string
     * @param query string to parse
     */
    constructor(query: string) {
        const splittedElements: string[] = query.split(SearchFilter.MAIN_SPLITTER_CHAR);
        Utils.checkArgument(splittedElements.length <= SearchFilter.MAXIMUM_MAIN_PART, "SearchQuery has too much main elements");

        // .filter(Boolean) is used to erase empty string in array
        this.mustValues = this.mustValues.concat(splittedElements[0].split(SearchFilter.EXPRESSION_SPLITTER_CHAR).filter(Boolean));
        if (splittedElements.length === SearchFilter.MAXIMUM_MAIN_PART) {
            this.shouldValues = this.shouldValues.concat(splittedElements[1].split(SearchFilter.EXPRESSION_SPLITTER_CHAR).filter(Boolean));
        }
    }

    /**
     * Must values getter
     *
     * @returns {string[]}
     */
    public getMustValues(): string[] {
        return this.mustValues;
    }

    /**
     * Should values getter
     *
     * @returns {string[]}
     */
    public getShouldValues(): string[] {
        return this.shouldValues;
    }
}
