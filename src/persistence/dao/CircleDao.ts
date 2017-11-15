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

import { Circle } from "../domain/Circle";

/**
 * Data Access Object of {@link CircleDao}
 */
export interface CircleDao {

    /**
     * Save or update a circle
     *
     * @param {Circle} circle to save
     *
     */
    saveOrUpdate(circle: Circle): Promise<void> | undefined;

    /**
     * Check if this specific circle exists
     *
     * @param {number} id circle's identifier
     *
     * @returns {Promise<boolean>} true means circle exists in database
     */
    exists(id: number): Promise<boolean>;

    /**
     * Retrieves a specific circle
     *
     * @param {number} id circle identifier
     *
     * @returns {Promise<Circle>} circle found
     */
    findById(id: number): Promise<Circle> | undefined;

    /**
     * Retrieves all circles matching the filter
     *
     * @param {number} localAuthorityId localAuthority identifier
     *
     * @returns circles
     */
    findAllBy(localAuthorityId: number): Promise<Circle[]>;

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
     * Delete specific circle
     *
     * @param {Circle} circle specific circle to delete
     */
    deleteCircle(circle: Circle): Promise<void>;
}
