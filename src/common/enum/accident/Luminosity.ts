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
export enum Luminosity {
    /**
     * 1 – Plein jour
     * 2 – Crépuscule ou aube
     * 3 – Nuit sans éclairage public
     * 4 - Nuit avec éclairage public non allumé
     * 5 – Nuit avec éclairage public allumé
     */
    PLAIN_DAY = 1,
    DUSK_OR_DAWN = 2,
    NIGHT_WITHOUT_LIGHT = 3,
    NIGHT_WITH_LIGHTS_OFF = 4,
    NIGHT_VISION_WITH_LIGHTS_ON = 5
}
