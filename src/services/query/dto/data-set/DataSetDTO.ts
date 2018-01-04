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

/**
 * Represent a dataSet
 */
export class DataSetDTO {

    /**
     * DataSet's identifier
     */
    private id: number;

    /**
     * DataSet's name
     */
    private name: string;

    /**
     * DataSet's description
     */
    private description: string;

    /**
     * DataSet by default if true
     */
    private restricted: boolean;

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter name
     *
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     *
     * @param name new name value
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Getter description
     *
     * @returns {string}
     */
    public getDescription(): string {
        return this.description;
    }

    /**
     * Setter description
     *
     * @param description new description value
     */
    public setDescription(description: string): void {
        this.description = description;
    }

    /**
     * Setter restricted
     *
     * @param {boolean} restricted
     */
    public setRestricted(restricted: boolean): void {
        this.restricted = restricted;
    }

    /**
     * Getter restricted
     *
     * @returns {boolean}
     */
    public isRestricted(): boolean {
        return this.restricted;
    }
}
