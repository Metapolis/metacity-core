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

import { AfterLoad, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { LocalAuthority } from "./LocalAuthority";
import { DataType } from "../../common/enum/DataType";

/**
 * Represents a data set
 */
@Entity()
export class DataSet {

    /**
     * DataSet logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(DataSet.name);

    /**
     * DataSet identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * DataSet name
     */
    @Column({nullable: false, length: 250})
    private name: string;

    /**
     * DataSet description
     */
    @Column({nullable: true})
    private description: string;

    /**
     * DataSet type of data
     */
    @Column({type: "text", nullable: false})
    private dataType: DataType;

    /**
     * DataSet is restricted when true
     * Means to access to data set you have to check roles
     */
    @Column({nullable: false})
    private restricted: boolean;

    /**
     * Circle's comma separated roles
     */
    @Column({type: "text", nullable: false})
    private roles: string;

    /**
     * Circle's localAuthority (owner of circle)
     */
    @ManyToOne((type) => LocalAuthority, (localAuthority) => "dataSets")
    private localAuthority: Promise<LocalAuthority>;

    /**
     * Transient role array
     */
    private roleArray: string[];

    /**
     * Method called when client entity is loaded (Because only one method annotated by @PostLoad is authorized)
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
     * Getter description
     *
     * @returns {string}
     */
    public getDescription(): string {
        return this.description;
    }

    /**
     * Setter description
     *
     * @param description new description value
     */
    public setDescription(description: string): void {
        this.description = description;
    }

    /**
     *  Getter restricted
     *
     * @returns {boolean}
     */
    public isRestricted(): boolean {
        return this.restricted;
    }

    /**
     * Setter restricted
     *
     * @param {boolean} restricted
     */
    public setRestricted(restricted: boolean): void {
        this.restricted = restricted;
    }

    /**
     * Getter DataType
     *
     * @returns {DataType}
     */
    public getDataType(): DataType {
        return this.dataType;
    }

    /**
     * Setter DataType
     *
     * @param dataType new dataType value
     */
    public setDataType(dataType: DataType): void {
        this.dataType = dataType;
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
     * Getter local authority
     *
     * @returns {Promise<LocalAuthority>}
     */
    public getLocalAuthority(): Promise<LocalAuthority> {
        return this.localAuthority;
    }

    /**
     * Setter local authority
     *
     * @param localAuthority authority new local authority value
     */
    public setLocalAuthority(localAuthority: Promise<LocalAuthority>): void {
        this.localAuthority = localAuthority;
    }
}
