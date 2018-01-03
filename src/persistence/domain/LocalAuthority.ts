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

import {
    AfterLoad,
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn
} from "typeorm";
import { Circle } from "./Circle";
import { DataSet } from "./DataSet";
import { UIConfig } from "../../common/model/UIConfig";
import { Credential } from "./Credential";
import { isNullOrUndefined } from "util";

/**
 * Represents a Local Authority
 */
@Entity()
export class LocalAuthority {

    /**
     * LocalAuthority's identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * LocalAuthority's name
     */
    @Column({nullable: false, length: 250})
    private name: string;

    /**
     * Local authority JSON UI config
     */
    private uiConfig: UIConfig;

    /**
     * Circle's localAuthority (owner of circle)
     */
    @OneToMany((type) => Circle, (circle) => "localAuthority")
    private circles: Promise<Circle[]>;

    /**
     * Circle's localAuthority (owner of circle)
     */
    @OneToOne((type) => Credential)
    @JoinColumn()
    private credential: Promise<Credential>;

    /**
     * LocalAuthority's data set
     *
     * You have to use getter and setter
     */
    @ManyToMany((type) => DataSet, (dataSet) => "localAuthorities")
    private dataSets: Promise<DataSet[]>;

    /**
     * Transient UI config JSON string
     */
    @Column({type: "text", nullable: true})
    private uiConfigJsonString: string;

    /**
     * Method called before client entity is loaded
     */
    @AfterLoad()
    private preload(): void {
        this.initUIConfig(this.uiConfigJsonString);
    }

    /**
     * Init UI JSON string with UI object
     *
     * @param {string} uiConfig json string
     */
    private initUIConfig(uiConfig: string): void {
        this.uiConfig = new UIConfig();
        if (!isNullOrUndefined(uiConfig)) {
            Object.assign(uiConfig, this.uiConfig);
        }
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
     * Getter circle
     *
     * @returns {Circle[]}
     */
    public getCircles(): Promise<Circle[]> {
        return this.circles;
    }

    /**
     * Setter circle
     *
     * @param circles new circle value
     */
    public setCircles(circles: Promise<Circle[]>): void {
        this.circles = circles;
    }

    /**
     * Getter credential
     *
     * @returns {Credential}
     */
    public getCredential(): Promise<Credential> {
        return this.credential;
    }

    /**
     * Setter credential
     *
     * @param credential new credential value
     */
    public setCredential(credential: Promise<Credential>): void {
        this.credential = credential;
    }

    /**
     * Getter dataSet
     *
     * @returns {DataSet[]}
     */
    public getDataSets(): Promise<DataSet[]> {
        return this.dataSets;
    }

    /**
     * Setter dataSet
     *
     * @param dataSets new dataSet value
     */
    public setDataSets(dataSets: Promise<DataSet[]>): void {
        this.dataSets = dataSets;
    }

    /**
     * Getter UI config
     *
     * @returns {UIConfig}
     */
    public getUIConfig(): UIConfig {
        return this.uiConfig;
    }

    /**
     * Setter UI config
     *
     * @param {UIConfig} uiConfig
     */
    public setUIConfig(uiConfig: UIConfig): void {
        this.uiConfig = uiConfig;
        this.uiConfigJsonString = JSON.stringify(uiConfig);
    }
}
