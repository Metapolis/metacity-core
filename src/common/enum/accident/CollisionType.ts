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
 * Contains Collision Type Values
 */
export enum CollisionType {
    /**
     * 1 – Deux véhicules - frontale
     * 2 – Deux véhicules – par l’arrière
     * 3 – Deux véhicules – par le coté
     * 4 – Trois véhicules et plus – en chaîne
     * 5 – Trois véhicules et plus  - collisions multiples
     * 6 – Autre collision
     * 7 – Sans collision
     */
    TWO_CARS_FRONTAL = 1,
    TWO_CARS_BACKSIDE = 2,
    TWO_CARS_ON_SIDE = 3,
    THREE_AND_MORE_IN_CHAIN = 4,
    THREE_AND_MORE_MULTIPLE_COLLISION = 5,
    OTHERS = 6,
    WITHOUT_COLLISION = 7
}
