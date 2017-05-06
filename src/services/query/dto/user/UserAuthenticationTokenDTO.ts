/**
 * User authentication token use to authenticate a user
 */
export class UserAuthenticationTokenDTO {

    /**
     * User's username
     */
    private username: string;

    /**
     * User's password (encrypt)
     */
    private password: string;

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
