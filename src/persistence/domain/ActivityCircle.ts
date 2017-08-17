import { Entity, Column, PrimaryGeneratedColumn, AfterLoad, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { User } from "./User";
import { Collectivity } from "./Collectivity";

/**
 * Represents a activity circle
 */
@Entity()
export class ActivityCircle {

    /**
     * ActivityCircle logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(ActivityCircle.name);

    /**
     * Activity Circle's identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * Activity Circle's name
     */
    @Column({nullable: false, length: 250})
    private name: string;

    /**
     * Circle's comma separated roles
     */
    @Column({type: "text", nullable: false})
    private roles: string;

    /**
     * Circle's users
     *
     * You have to use getter and setter
     */
    @ManyToMany((type) => User, (user) => "circles")
    @JoinTable()
    private users: Promise<User[]>;

    /**
     * Circle's collectivity (owner of circle)
     */
    @ManyToOne((type) => Collectivity, (collectivity) => "circles")
    private collectivity: Collectivity;

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
     * Getter users
     *
     * @returns {User[]}
     */
    public getUsers(): Promise<User[]> {
        return this.users;
    }

    /**
     * Setter users
     *
     * @param users new users value
     */
    public setUsers(users: Promise<User[]>): void {
        this.users = users;
    }

    /**
     * Getter collectivity
     *
     * @returns {Collectivity}
     */
    public getCollectivity(): Collectivity {
        return this.collectivity;
    }

    /**
     * Setter collectivity
     *
     * @param collectivity new collectivity value
     */
    public setCollectivity(collectivity: Collectivity): void {
        this.collectivity = collectivity;
    }
}
