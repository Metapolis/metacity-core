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
 * Contains all information of user token identifier
 */
export class UserTokenDTO {

    /**
     * User's email
     */
    private email: string;

    /**
     * User's identifier
     */
    private id: number;

    /**
     * User's token (JWT)
     */
    private token: string;

    /**
     * Getter id
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter id
     *
     * @param id new id value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter lastName
     *
     * @returns {number}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter lastName
     *
     * @param email new lastName value
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Getter token
     *
     * @returns {number}
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Setter token
     *
     * @param token new token value
     */
    public setToken(token: string): void {
        this.token = token;
    }
}
