/**
 * Represents a command to update a circle
 */
export class UpdateCircleCommandDTO {

    /**
     * LocalAuthority's credential access key
     */
    private accessKey: string;

    /**
     * Circle's identifier
     */
    private id: number;

    /**
     * Circle's name
     */
    private name: string;

    /**
     * Circle's roles
     */
    private roles: string[];

    /**
     * Circle by default if true
     */
    private defaultCircle: boolean;

    /**
     * Circle's members
     */
    private members: number[] = [];

    /**
     * Getter accessKey
     * @returns {string}
     */
    public getAccessKey(): string {
        return this.accessKey;
    }

    /**
     * Setter accessKey
     * @param {string} accessKey
     */
    public setAccessKey(accessKey: string): void {
        this.accessKey = accessKey;
    }

    /**
     * Getter id
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter id
     * @param {number} id
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter name
     * @returns {string}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     * @param {string} name
     */
    public setName(name: string): void {
        this.name = name;
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

    /**
     * Getter Roles
     * @returns {string[]}
     */
    public getRoles(): string[] {
        return this.roles;
    }

    /**
     * Setter Roles
     * @param {string[]} roles
     */
    public setRoles(roles: string[]): void {
        this.roles = roles;
    }

    /**
     * Get members for all fields
     *
     * @returns {number[]} members array of members
     */
    public getMembers(): number[] {
        return this.members;
    }

    /**
     * Set members for all fields
     *
     * @param {number[]} members array of members
     */
    public setMembers(members: number[]): void {
        this.members = members;
    }
}
