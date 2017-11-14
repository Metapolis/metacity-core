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

import { User } from "../domain/User";
import { FindUserQuery } from "../../common/query/FindUserQuery";

/**
 * Data Access Object of {@link User}
 */
export interface UserDao {

    /**
     * Retrieve user by email
     *
     * @param email email to find
     */
    findByEmail(email: string): Promise<User> | undefined;

    /**
     * Retrieve user by id
     *
     * @param id identifier to find
     */
    findById(id: number): Promise<User> | undefined;

    /**
     * Find users
     *
     * @param {FindUserQuery} query query use to find users
     *
     * @returns {Promise<User[]>} users found
     */
    findBy(query: FindUserQuery): Promise<User[]>;

    /**
     * Save or update a user
     *
     * @param {User} user to create
     */
    saveOrUpdate(user: User): Promise<void>;

    /**
     * Count user for a specific query
     *
     * @param {FindUserQuery} query query use to count users
     *
     * @returns {number} number of found user
     */
    countBy(query: FindUserQuery): Promise<number>;
}
