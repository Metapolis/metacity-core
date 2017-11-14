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

import { Location } from "./Location";

/**
 * UI config description
 */
export class UIConfig {

    /**
     * UI primary color
     */
    private primaryColor: string;

    /**
     * UI secondary color
     */
    private secondaryColor: string;

    /**
     * UI logo
     */
    private logo: string;

    /**
     * Location embedded in UI config
     */
    private location: Location;

    /**
     * Getter primary color
     *
     * @returns {string}
     */
    public getPrimaryColor(): string {
        return this.primaryColor;
    }

    /**
     * Setter secondary color
     *
     * @param {string} primaryColor
     */
    public setPrimaryColor(primaryColor: string): void {
        this.primaryColor = primaryColor;
    }

    /**
     * Getter secondary color
     *
     * @returns {string}
     */
    public getSecondaryColor(): string {
        return this.secondaryColor;
    }

    /**
     * Setter secondary color
     * @param {string} secondaryColor
     */
    public setSecondaryColor(secondaryColor: string): void {
        this.secondaryColor = secondaryColor;
    }

    /**
     * Getter logo
     *
     * @returns {string}
     */
    public getLogo(): string {
        return this.logo;
    }

    /**
     * Setter logo
     *
     * @param {string} logo
     */
    public setLogo(logo: string): void {
        this.logo = logo;
    }

    /**
     * Getter Location
     *
     * @returns {Location}
     */
    public getLocation(): Location {
        return this.location;
    }

    /**
     * Setter Location
     *
     * @param {Location} location
     */
    public setLocation(location: Location): void {
        this.location = location;
    }
}
