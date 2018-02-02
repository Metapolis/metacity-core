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

import { InfluxDBSchema } from "./InfluxDBSchema";
import { FieldType, ISchemaOptions } from "influx";

/**
 * Test influx db schema
 */
export class TestSchema implements InfluxDBSchema {

    /**
     * Measurement name
     *
     * @type {string}
     */
    private measurementName: string = "response_time";

    /**
     * Field type of path
     *
     * @type {FieldType.STRING}
     */
    private path: FieldType = FieldType.STRING;

    /**
     * Field type of duration
     *
     * @type {FieldType.INTEGER}
     */
    private duration: FieldType = FieldType.INTEGER;

    /**
     * Tags
     *
     * @type {string[]}
     */
    private tags: string[] = ["host"];

    /**
     * Get the influx db schema
     *
     * @returns {ISchemaOptions}
     */
    public getSchema(): ISchemaOptions {
        // Ugly solution... thanks again to JS
        return {
            measurement: this.measurementName,
            fields: {
                path: this.path,
                duration: this.duration
            },
            tags: this.tags
        };
    }
}
