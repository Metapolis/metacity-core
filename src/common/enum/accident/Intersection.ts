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
 * Contains Intersection Values
 */
export enum Intersection {
    /**
     * 1 – Hors intersection
     * 2 – Intersection en X
     * 3 – Intersection en T
     * 4 – Intersection en Y
     * 5 - Intersection à plus de 4 branches
     * 6 - Giratoire
     * 7 - Place
     * 8 – Passage à niveau
     * 9 – Autre intersection
     */
    NO_INTERSECTION = 1,
    X_INTERSECTION = 2,
    T_INTERSECTION = 3,
    Y_INTERSECTION = 4,
    FOUR_PLUS_INTERSECTION = 5,
    ROUND = 6,
    PLACE = 7,
    RAILROAD_CROSSING = 8,
    OTHERS = 9
}
