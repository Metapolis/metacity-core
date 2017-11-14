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
 * Contains luminosity Values
 */
export enum GPSType {
    /**
     * M – Metropole
     * A – Antille
     * G – Guyane
     * R – Reunion
     * Y - Mayotte
     */
    // the as any is a big trick to use string with enum
    METROPOLE = "M" as any,
    ANTILLE = "A" as any,
    GUYANNE = "G" as any,
    REUNION = "R" as any,
    MAYOTTE = "Y" as any

}
