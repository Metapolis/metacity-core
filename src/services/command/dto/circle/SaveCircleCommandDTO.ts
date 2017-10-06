/**
 * Represents a command to create a circle
 */
export class SaveCircleCommandDTO {

    /**
     * LocalAuthority's identifier
     */
    private accessKey: string;

    /**
     * Circle's name
     */
    private name: string;

    /**
     * Circle's roles
     */
    private roles: string[];

    /**
     * Circle's description
     */
    private description: string;

    /**
     * Circle's avatarURL
     */
    private avatarURL: string;

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
     * Getter description
     * @returns {string}
     */

    public getDescription(): string {
        return this.description;
    }

    /**
     * Setter description
     * @param {string} description
     */
    public setDescription(description: string): void {
        this.description = description;
    }

    /**
     * Getter avatarURL
     * @returns {string}
     */
    public getAvatarURL(): string {
        return this.avatarURL;
    }

    /**
     * Setter avatarURL
     * @param {string} avatarURL
     */
    public setAvatarURL(avatarURL: string): void {
        this.avatarURL = avatarURL;
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
}
