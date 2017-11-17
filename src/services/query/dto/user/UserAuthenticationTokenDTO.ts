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
 * User authentication token use to authenticate a user
 */
export class UserAuthenticationTokenDTO {

    /**
     * User's email
     */
    private email: string;

    /**
     * User's password (encrypt)
     */
    private password: string;

    /**
     * User's domain request
     */
    private domain: string;

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
     * Getter password
     *
     * @returns {number}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Setter password
     *
     * @param password new password value
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter domain
     *
     * @returns {number}
     */
    public getDomain(): string {
        return this.domain;
    }

    /**
     * Setter domain
     *
     * @param domain new domain value
     */
    public setDomain(domain: string): void {
        this.domain = domain;
    }
}
