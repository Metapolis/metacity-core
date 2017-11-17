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
import { ValueTerm } from "./model/ValueTerm";

/**
 * Term query use to search on field a text or a number is equals
 */
export class TermQuery implements Query {
    /**
     * Term map containing field => value
     * @type {Map<string, ValueTerm>}
     */
    private term: Map<string, ValueTerm> = new Map<string, ValueTerm>();

    /**
     * Constructor
     * @param field
     * @param value
     */
    constructor(field: string, value: number | string) {
        const valueTerm = new ValueTerm(value);
        this.term.set(field, valueTerm);
    }

    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"term\" : {";
        for (const key of this.term.keys()) {
            strQuery += "\"" + key + "\": " + this.term.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
