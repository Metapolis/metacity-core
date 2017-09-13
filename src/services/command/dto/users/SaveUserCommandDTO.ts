/**
 * Represents a command to create a user
 */
export class SaveUserCommandDTO {

    /**
     * User username
     */
    private username: string;

    /**
     * User password
     */
    private password: string;

    /**
     * User email address
     */
    private email: string;

    /**
     * User address
     */
    private address: string;

    /**
     * User avatarURL
     */
    private avatarURL: string;

    /**
     * Getter username
     * @returns {string}
     */
    public getUsername(): string {
        return this.username;
    }

    /**
     * Setter username
     * @param {string} username
     */
    public setUsername(username: string): void {
        this.username = username;
    }

    /**
     * Getter password
     * @returns {string}
     */
    public getPassword(): string {
        return this.password;
    }

    /**
     * Setter password
     * @param {string} password
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter email address
     * @returns {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter email address
     * @param {string} email
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Getter address
     * @returns {string}
     */
    public getAddress(): string {
        return this.address;
    }

    /**
     * Setter address
     * @param {string} address
     */
    public setAddress(address: string): void {
        this.address = address;
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

}
