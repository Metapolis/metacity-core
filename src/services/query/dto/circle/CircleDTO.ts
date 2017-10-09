import { Role } from "../../../../common/enum/Role";
import { UserDTO } from "./UserDTO";

/**
 * Represent a circle
 */
export class CircleDTO {

    /**
     * Circle's identifier
     */
    private id: number;

    /**
     * Circle's name
     */
    private name: string;

    /**
     * Circle by default if true
     */
    private defaultCircle: boolean;

    /**
     * Circle's comma separated roles
     */
    private roles: Role[] = [];

    /**
     * Circle's members
     */
    private members: UserDTO[] = [];

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
    public setRoles(roles: Role[]): void {
        this.roles = roles;
    }

    /**
     * Get roles for all fields
     *
     * @return {Role[]}
     */
    public getRoles(): Role[] {
        return this.roles;
    }

    /**
     * Set members for all fields
     *
     * @param members array of members
     */
    public setMembers(members: UserDTO[]): void {
        this.members = members;
    }

    /**
     * Get members for all fields
     *
     * @return {UserDTO[]}
     */
    public getMembers(): UserDTO[] {
        return this.members;
    }

    /**
     * Setter default circle
     *
     * @param {boolean} defaultCircle
     */
    public setDefaultCircle(defaultCircle: boolean): void {
        this.defaultCircle = defaultCircle;
    }

    /**
     * Getter default circle
     *
     * @returns {boolean}
     */
    public isDefaultCircle(): boolean {
        return this.defaultCircle;
    }
}
