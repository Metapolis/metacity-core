import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

/**
 * [Entity description]
 * @return {[type]} [description]
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
     * Getter username
     *
     * @returns {number}
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
     * @returns {number}
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
}
