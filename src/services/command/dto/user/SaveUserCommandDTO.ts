/**
 * Represents a command to create a user
 */
export class SaveUserCommandDTO {

    /**
     * User first name
     */
    private firstName: string;

    /**
     * User last name
     */
    private lastName: string;

    /**
     * User password
     */
    private password: string;

    /**
     * User email
     */
    private email: string;

    /**
     * User avatarUrl
     */
    private avatarUrl: string;

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getFirstName(): string {
        return this.firstName;
    }

    /**
     * Setter lastName
     *
     * @param {string} firstName
     */
    public setFirstName(firstName: string): void {
        this.firstName = firstName;
    }

    /**
     * Getter lastName
     *
     * @returns {string}
     */
    public getLastName(): string {
        return this.lastName;
    }

    /**
     * Setter lastName
     *
     * @param {string} lastName
     */
    public setLastName(lastName: string): void {
        this.lastName = lastName;
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
     * @param {string} password
     */
    public setPassword(password: string): void {
        this.password = password;
    }

    /**
     * Getter email address
     *
     * @returns {string}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter email address
     *
     * @param {string} email
     */
    public setEmail(email: string): void {
        this.email = email;
    }

    /**
     * Getter avatarUrl
     *
     * @returns {string}
     */
    public getAvatarURL(): string {
        return this.avatarUrl;
    }

    /**
     * Setter avatarUrl
     *
     * @param {string} avatarURL
     */
    public setAvatarURL(avatarURL: string): void {
        this.avatarUrl = avatarURL;
    }

}
