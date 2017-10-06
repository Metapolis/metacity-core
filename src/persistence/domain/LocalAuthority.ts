import { Entity, Column, PrimaryColumn, OneToMany, ManyToMany } from "typeorm";
import { Circle } from "./Circle";
import { DataSet } from "./DataSet";

/**
 * Represents a user
 */
@Entity()
export class LocalAuthority {

    /**
     * LocalAuthority's identifier
     */
    @PrimaryColumn()
    private id: string;

    /**
     * LocalAuthority's secret
     */
    @Column({nullable: false, length: 250})
    private secret: string;

    /**
     * LocalAuthority's name
     */
    @Column({nullable: false, length: 250})
    private name: string;

    /**
     * Circle's localAuthority (owner of circle)
     */
    @OneToMany((type) => Circle, (circle) => "localAuthority")
    private circles: Promise<Circle[]>;

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
     * @returns {string}
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: string): void {
        this.id = id;
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
}
