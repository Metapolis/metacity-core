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

/**
 * Contains bool query fields
 */
export class BoolQuery implements Query {
    /**
     * Bool query definition
     */
    private bool: Map<string, Query[]> = new Map<string, Query[]>();

    /**
     * Must query
     */
    public must(query: Query): void {
        if (!this.bool.has("must")) {
            this.bool.set("must", []);
        }
        this.bool.get("must").push(query);
    }

    /**
     * Should query
     */
    public should(query: Query): void {
        if (!this.bool.has("should")) {
            this.bool.set("should", []);
        }
        this.bool.get("should").push(query);
    }

    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"bool\" : {";
        for (const key of this.bool.keys()) {
            strQuery += "\"" + key + "\": [";
            /*
             Temporary hack cause I have a headache! :P
             */
            let index: number = 0;
            for (const boolTerm of this.bool.get(key)) {
                strQuery += boolTerm.render();
                if (index !== (this.bool.get(key).length - 1)) {
                    index++;
                    strQuery += ",";
                }
            }
            strQuery += "]";
        }
        strQuery += "}}";
        return strQuery;
    }

}
