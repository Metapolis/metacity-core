import { Entity, Column, PrimaryGeneratedColumn, AfterLoad, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { LocalAuthority } from "./LocalAuthority";

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
    private dataType: string;

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
     * Dataset's local authority
     */
    @ManyToMany((type) => LocalAuthority, (localAuthority) => "dataSets")
    @JoinTable()
    private localAuthority: Promise<LocalAuthority[]>;

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
     * @returns {string}
     */
    public getDataType(): string {
        return this.dataType;
    }

    /**
     * Setter DataType
     *
     * @param dataType new dataType value
     */
    public setDataType(dataType: string): void {
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
     * @returns {Promise<LocalAuthority[]>}
     */
    public getLocalAuthoritiy(): Promise<LocalAuthority[]> {
        return this.localAuthority;
    }

    /**
     * Setter local authority
     *
     * @param localAuthority authority new local authority value
     */
    public setLocalAuthoritiy(localAuthority: Promise<LocalAuthority[]>): void {
        this.localAuthority = localAuthority;
    }
}
