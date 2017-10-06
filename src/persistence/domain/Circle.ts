import { Entity, Column, PrimaryGeneratedColumn, AfterLoad, ManyToMany, ManyToOne, JoinTable } from "typeorm";
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
     * Circle's description
     */
    @Column({nullable: true})
    private description: string;

    /**
     * Circle's avatar url
     */
    @Column({nullable: true})
    private avatarUrl: string;

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
     * Getter avatarUrl
     *
     * @returns {string}
     */
    public getAvatarUrl(): string {
        return this.avatarUrl;
    }

    /**
     * Setter avatarUrl
     *
     * @param avatarUrl new avatarUrl value
     */
    public setAvatarUrl(avatarUrl: string): void {
        this.avatarUrl = avatarUrl;
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
     * Getter user
     *
     * @returns {User[]}
     */
    public getUsers(): Promise<User[]> {
        return this.users;
    }

    /**
     * Setter user
     *
     * @param users new user value
     */
    public setUsers(users: Promise<User[]>): void {
        this.users = users;
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
