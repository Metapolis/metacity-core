import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { ActivityCircle } from "./ActivityCircle";

/**
 * Represents a user
 */
@Entity()
export class User {

    /**
     * User's identifier
     */
    @PrimaryGeneratedColumn({type: "bigint"})
    private id: number;

    /**
     * User's username
     */
    @Column({nullable: false})
    private username: string;

    /**
     * User's password
     */
    @Column({nullable: false})
    private password: string;

    /**
     * User's last connection
     */
    @Column({nullable: true, type: "bigint"})
    private lastConnection: number;

    /**
     * User's circles
     *
     * You have to use getter and setter
     */
    @ManyToMany((type) => ActivityCircle, (activityCircle) => "users")
    private circles: Promise<ActivityCircle[]>;

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
     * Getter lastConnection
     *
     * @returns {number}
     */
    public getLastConnection(): number {
        return this.lastConnection;
    }

    /**
     * Setter lastConnection
     *
     * @param lastConnection new lastConnection value
     */
    public setLastConnection(lastConnection: number): void {
        this.lastConnection = lastConnection;
    }

    /**
     * Getter username
     *
     * @returns {string}
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * Setter username
     *
     * @param username new username value
     */
    public setUsername(username: string): void {
        this.username = username;
    }

    /**
     * Getter password
     *
     * @returns {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Setter password
     *
     * @param password new password value
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter circles
     *
     * @returns {ActivityCircle[]}
     */
    public getCircles(): Promise<ActivityCircle[]> {
        return this.circles;
    }

    /**
     * Setter circles
     *
     * @param circles new circles value
     */
    public setCircles(circles: Promise<ActivityCircle[]>): void {
        this.circles = circles;
    }

    /**
     * Return all roles of a user (retrieve these in all circle)
     *
     * @returns {Promise<string[]>}
     */
    public async getRoles(): Promise<string[]> {
        let roles: string[] = [];
        for (const circle of await this.circles) {
            roles = roles.concat(circle.getRoles());
        }

        return roles;
    }
}
