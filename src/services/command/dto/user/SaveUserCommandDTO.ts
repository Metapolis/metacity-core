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
 * Represents a command to create a user
 */
export class SaveUserCommandDTO {

    /**
     * User first name
     */
    private firstName: string;

    /**
     * User last name
     */
    private lastName: string;

    /**
     * User password
     */
    private password: string;

    /**
     * User email
     */
    private email: string;

    /**
     * User avatarUrl
     */
    private avatarUrl: string;

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Setter lastName
     *
     * @param {string} firstName
     */
    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Setter lastName
     *
     * @param {string} lastName
     */
    public setLastName(lastName: string): void {
        this.lastName = lastName;
    }

    /**
     * Getter password
     *
     * @returns {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Setter password
     *
     * @param {string} password
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter email address
     *
     * @returns {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter email address
     *
     * @param {string} email
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Getter avatarUrl
     *
     * @returns {string}
     */
    public getAvatarUrl(): string {
        return this.avatarUrl;
    }

    /**
     * Setter avatarUrl
     *
     * @param {string} avatarUrl
     */
    public setAvatarUrl(avatarUrl: string): void {
        this.avatarUrl = avatarUrl;
    }
}
