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

import { DefaultNamingStrategy, NamingStrategyInterface } from "typeorm";

/**
 * Naming strategy for postgreSQL
 */
export class PostgresNamingStrategy extends DefaultNamingStrategy implements NamingStrategyInterface {

    /**
     * Override
     */
    public columnName(propertyName: string, customName: string): string {
        return customName ? customName : propertyName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public joinTableColumnName(tableName: string, propertyName: string, columnName?: string): string {
        return tableName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + propertyName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public joinColumnName(relationName: string, referencedColumnName: string): string {
        return relationName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + referencedColumnName.split(/(?=[A-Z])/).join("_").toLowerCase();
    }

    /**
     * Override
     */
    public foreignKeyName(tableName: string, columnNames: string[], referencedTableName: string, referencedColumnNames: string[]): string {
        return referencedTableName.split(/(?=[A-Z])/).join("_").toLowerCase() + "_" + referencedColumnNames.join("_").split(/(?=[A-Z])/).join("_").toLowerCase();
    }
}
