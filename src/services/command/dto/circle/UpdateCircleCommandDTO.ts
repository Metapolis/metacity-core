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
 * Represents a command to update a circle
 */
export class UpdateCircleCommandDTO {

    /**
     * LocalAuthority's identifier
     */
    private localAuthorityId: number;

    /**
     * Circle's identifier
     */
    private id: number;

    /**
     * Circle's name
     */
    private name: string;

    /**
     * Circle's roles
     */
    private roles: string[];

    /**
     * Circle by default if true
     */
    private defaultCircle: boolean;

    /**
     * Circle's members
     */
    private members: number[] = [];

    /**
     * Getter localAuthorityId
     * @returns {string}
     */
    public getLocalAuthorityId(): number {
        return this.localAuthorityId;
    }

    /**
     * Setter localAuthorityId
     * @param {string} localAuthorityId
     */
    public setLocalAuthorityId(localAuthorityId: number): void {
        this.localAuthorityId = localAuthorityId;
    }

    /**
     * Getter id
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter id
     * @param {number} id
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter name
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     * @param {string} name
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Setter default circle
     *
     * @param {boolean} defaultCircle
     */
    public setDefaultCircle(defaultCircle: boolean): void {
        this.defaultCircle = defaultCircle;
    }

    /**
     * Getter default circle
     *
     * @returns {boolean}
     */
    public isDefaultCircle(): boolean {
        return this.defaultCircle;
    }

    /**
     * Getter Roles
     * @returns {string[]}
     */
    public getRoles(): string[] {
        return this.roles;
    }

    /**
     * Setter Roles
     * @param {string[]} roles
     */
    public setRoles(roles: string[]): void {
        this.roles = roles;
    }

    /**
     * Get members for all fields
     *
     * @returns {number[]} members array of members
     */
    public getMembers(): number[] {
        return this.members;
    }

    /**
     * Set members for all fields
     *
     * @param {number[]} members array of members
     */
    public setMembers(members: number[]): void {
        this.members = members;
    }
}
