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
     * User's domain request
     */
    private domain: string;

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

    /**
     * Getter domain
     *
     * @returns {number}
     */
    public getDomain(): string {
        return this.domain;
    }

    /**
     * Setter domain
     *
     * @param domain new domain value
     */
    public setDomain(domain: string): void {
        this.domain = domain;
    }
}
