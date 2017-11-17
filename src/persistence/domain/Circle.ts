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

import { AfterLoad, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { User } from "./User";
import { LocalAuthority } from "./LocalAuthority";

/**
 * Represents a circle
 */
@Entity()
export class Circle {

    /**
     * DataSet logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(Circle.name);

    /**
     * Circle's identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * Circle's name
     */
    @Column({nullable: false, length: 250})
    private name: string;

    /**
     * When default circle is true, the circle is the circle by default
     */
    @Column({nullable: false})
    private defaultCircle: boolean;

    /**
     * Circle's comma separated roles
     */
    @Column({type: "text", nullable: false})
    private roles: string;

    /**
     * Circle's user
     *
     * You have to use getter and setter
     */
    @ManyToMany((type) => User, (user) => "circles")
    @JoinTable()
    private users: Promise<User[]>;

    /**
     * Circle's localAuthority (owner of circle)
     */
    @ManyToOne((type) => LocalAuthority, (localAuthority) => "circles")
    private localAuthority: Promise<LocalAuthority>;

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
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter name
     *
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     *
     * @param name new name value
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Getter default circle
     *
     * @returns {boolean}
     */
    public isDefaultCircle() {
        return this.defaultCircle;
    }

    /**
     * Setter default circle
     *
     * @param {boolean} defaultCircle
     */
    public setDefaultCircle(defaultCircle: boolean) {
        this.defaultCircle = defaultCircle;
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

    /**
     * Setter user
     *
     * @param {Promise<User[]>} users
     */
    public setUsers(users: Promise<User[]>): void {
        this.users = users;
    }

    /**
     * Getter user
     *
     * @returns {User[]}
     */
    public getUsers(): Promise<User[]> {
        return this.users;
    }

    /**
     * Getter localAuthority
     *
     * @returns {LocalAuthority}
     */
    public getLocalAuthority(): Promise<LocalAuthority> {
        return this.localAuthority;
    }

    /**
     * Setter localAuthority
     *
     * @param localAuthority new localAuthority value
     */
    public setLocalAuthority(localAuthority: Promise<LocalAuthority>): void {
        this.localAuthority = localAuthority;
    }
}
