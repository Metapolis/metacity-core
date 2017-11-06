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
import { UIConfig } from "./UIConfig";
import { Credential } from "./Credential";

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
    @Column({type: "text", nullable: true})
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
    private uiConfigJsonString: string;

    /**
     * Method called before client entity is loaded
     */
    @AfterLoad()
    private preload(): void {
        this.initUIJsonString(this.uiConfig);
    }

    /**
     * Init UI JSON string with UI object
     *
     * @param {UIConfig} uiConfig
     */
    private initUIJsonString(uiConfig: UIConfig): void {
        this.uiConfigJsonString = JSON.stringify(uiConfig);
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
    }
}
