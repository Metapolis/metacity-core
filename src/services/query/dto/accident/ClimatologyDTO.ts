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

import { Luminosity } from "../../../../common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../../../common/enum/accident/AtmosphericCondition";

/**
 * Data transfer object with all details about a climatology
 */
export class ClimatologyDTO {

    /**
     * ClimatologyDTO luminosity
     */
    private luminosity: Luminosity;

    /**
     * ClimatologyDTO atmospheric condition
     */
    private atmosphericCondition: AtmosphericCondition;

    /**
     * Constructor from json
     *
     * @param json json used to construction
     */
    constructor(json: {} = {}) {
        Object.assign(this, json);
    }

    /**
     * Getter luminosity
     *
     * @returns {Luminosity}
     */
    public getLuminosity(): Luminosity {
        return this.luminosity;
    }

    /**
     * Setter luminosity
     *
     * @param luminosity new luminosity value
     */
    public setLuminosity(luminosity: Luminosity): void {
        this.luminosity = luminosity;
    }

    /**
     * Getter atmosphericCondition
     *
     * @returns {AtmosphericCondition}
     */
    public getAtmosphericCondition(): AtmosphericCondition {
        return this.atmosphericCondition;
    }

    /**
     * Setter atmosphericCondition
     *
     * @param atmosphericCondition new atmospheric condition value
     */
    public setAtmosphericCondition(atmosphericCondition: AtmosphericCondition): void {
        this.atmosphericCondition = atmosphericCondition;
    }
}
