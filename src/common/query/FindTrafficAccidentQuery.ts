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

import { LogicalQueryCriteria } from "./LogicalQueryCriteria";
import { GeoShape } from "../GeoShape";
import { Config } from "../../Config";

/**
 * Contains traffic accident search query
 */
export class FindTrafficAccidentQuery {

    /**
     * Index to search
     *
     * @type {string}
     */
    private index: string = Config.getIndexNameTraffic();

    /**
     * Document type
     *
     * @type {string}
     */
    private type: string = Config.getDocumentNameAccident();

    /**
     * Query limit (default 100)
     *
     * @type {number}
     */
    private limit: number = 100;

    /**
     * Query offset (default 0)
     * @type {number}
     */
    private offset: number = 0;

    /**
     * Geo shape filter
     */
    private geoFilter: LogicalQueryCriteria<GeoShape>;

    /**
     * True means optional parameters are set
     *
     * @returns {boolean} True if one of optional parameter is set
     */
    public isSet(): boolean {
        return this.geoFilter != null;
    }

    /**
     * Accident's geoFilter getter
     */
    public getGeoFilter(): LogicalQueryCriteria<GeoShape> {
        return this.geoFilter;
    }

    /**
     * Accident's geoFilter setter
     */
    public setGeoFilter(geoFilter: LogicalQueryCriteria<GeoShape>) {
        this.geoFilter = geoFilter;
    }

    /**
     * Accident's limit getter
     */
    public getLimit(): number {
        return this.limit;
    }

    /**
     * Accident's limit setter
     */
    public setLimit(limit: number) {
        this.limit = limit;
    }

    /**
     * Accident's offset getter
     */
    public getOffset(): number {
        return this.offset;
    }

    /**
     * Accident's offset setter
     */
    public setOffset(offset: number) {
        this.offset = offset;
    }

    /**
     * Accident's type getter
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Accident's index getter
     */
    public getIndex(): string {
        return this.index;
    }
}
