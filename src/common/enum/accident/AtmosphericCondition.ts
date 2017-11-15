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
 * Contains atmospheric condition values
 */
export enum AtmosphericCondition {
    /**
     * 1 – Normale
     * 2 – Pluie légère
     * 3 – Pluie forte
     * 4 – Neige - grêle
     * 5 – Brouillard - fumée
     * 6 – Vent fort - tempête
     * 7 – Temps éblouissant
     * 8 – Temps couvert
     * 9 – Autre
     */
    NORMAL = 1,
    LIGHT_RAIN = 2,
    HEAVY_RAIN = 3,
    SNOW_OR_HAIL = 4,
    FOG_OR_SMOG = 5,
    STRONG_WIND = 6,
    DAZZLING_WEATHER = 7,
    CLOUDY_WEATHER = 8,
    OTHERS = 9
}
