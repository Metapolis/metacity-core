import { Entity, Column, OneToMany, ManyToMany, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Circle } from "./Circle";
import { DataSet } from "./DataSet";
import { UIConfig } from "./UIConfig";
import { Credential } from "./Credential";

/**
 * Represents a user
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
     * Ui config embedded in local authority
     */
    @Column((type: object) => UIConfig)
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
     * Getter Ui config
     *
     * @returns {UIConfig}
     */
    public getUIConfig(): UIConfig {
        return this.uiConfig;
    }

    /**
     * Setter Ui config
     *
     * @param {UIConfig} uiConfig
     */
    public setUIConfig(uiConfig: UIConfig): void {
        this.uiConfig = uiConfig;
    }
}
