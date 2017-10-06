import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm";
import { ActivityCircle } from "./ActivityCircle";

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
    @OneToMany((type) => ActivityCircle, (circle) => "localAuthority")
    private circles: Promise<ActivityCircle[]>;

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
    public getCircles(): Promise<ActivityCircle[]> {
        return this.circles;
    }

    /**
     * Setter circle
     *
     * @param circles new circle value
     */
    public setCircles(circles: Promise<ActivityCircle[]>): void {
        this.circles = circles;
    }
}
