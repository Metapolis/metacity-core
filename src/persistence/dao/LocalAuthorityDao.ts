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

import { LocalAuthority } from "../domain/LocalAuthority";
import { Circle } from "../domain/Circle";

/**
 * Data Access Object of {@link LocalAuthorityDao}
 */
export interface LocalAuthorityDao {

    /**
     * Retrieve localAuthority by id
     *
     * @param id identifier to find
     */
    findById(id: number): Promise<LocalAuthority> | undefined;

    /**
     * Retrieve localAuthority by credential access key
     *
     * @param accessKey credential's identifier
     */
    findByCredentialAccessKey(accessKey: string): Promise<LocalAuthority> | undefined;

    /**
     * Check if this specific local authority exists
     *
     * @param {number} id local authority's identifier
     *
     * @returns {Promise<boolean>} true means local authority exists in database
     */
    isExists(id: number): Promise<boolean>;

    /**
     * Save or update a localAuthority
     *
     * @param {LocalAuthority} localAuthority to save
     *
     */
    saveOrUpdate(localAuthority: LocalAuthority): Promise<void>;
}
