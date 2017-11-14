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

import { CircleDTO } from "./dto/circle/CircleDTO";

/**
 * Contains method to perform circle query
 */
export interface CircleQueryService {

    /**
     * Check if circle exists
     *
     * @param id circle's identifier
     *
     * @returns {Promise<boolean>} true means circle with this specific identifier exists
     */
    exists(id: number): Promise<boolean>;

    /**
     * Check if circle is owned by localAuthority
     *
     * @param {number} circleId circle identifier
     * @param {number} localAuthorityId localAuthority identifier
     *
     * @returns {boolean} true means localAuthority own circle
     */
    isOwnedByLocalAuthority(circleId: number, localAuthorityId: number): Promise<boolean>;

    /**
     * Get specific circle
     *
     * @param {number} circleId circle identifier
     * @returns {CircleDTO} return the DTO of specific circle
     */
    getCircle(circleId: number): Promise<CircleDTO> | null;
}
