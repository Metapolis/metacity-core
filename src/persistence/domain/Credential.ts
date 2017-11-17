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

import { AfterLoad, Column, Entity, PrimaryColumn } from "typeorm";

/**
 * Credential use to authenticate element on api
 */
@Entity()
export class Credential {

    /**
     * Credential's access key
     */
    @PrimaryColumn()
    private accessKey: string;

    /**
     * Credential's secret
     */
    @Column({nullable: false, length: 250})
    private secret: string;

    /**
     * Circle's comma separated roles
     */
    @Column({type: "text", nullable: false})
    private roles: string;

    /**
     * Transient role array
     */
    private roleArray: string[];

    /**
     * Method called when client entity is loaded (Because only one method annotated by @AfterLoad is authorized)
     */
    @AfterLoad()
    private postLoad(): void {
        this.initRoleArray(this.roles);
    }

    /**
     * Getter secret
     *
     * @returns {string}
     */
    public getSecret(): string {
        return this.secret;
    }

    /**
     * Setter secret
     *
     * @param secret new secret value
     */
    public setSecret(secret: string): void {
        this.secret = secret;
    }

    /**
     * Getter accessKey
     *
     * @returns {string}
     */
    public getAccessKey(): string {
        return this.accessKey;
    }

    /**
     * Setter accessKey
     *
     * @param accessKey new accessKey value
     */
    public setAccessKey(accessKey: string): void {
        this.accessKey = accessKey;
    }

    /**
     * Set roles for all fields
     *
     * @param roles array of roles
     */
    public setRoles(roles: string[]): void {
        this.roles = roles.join(",");
        this.roleArray = roles;
    }

    /**
     * Get roles for all fields
     *
     * @return {string[]}
     */
    public getRoles(): string[] {
        return this.roleArray;
    }

    /**
     * Init role array with roles in string
     *
     * @param roles roles separate by comma
     */
    private initRoleArray(roles: string): void {
        this.roleArray = roles.split(",");
    }
}
