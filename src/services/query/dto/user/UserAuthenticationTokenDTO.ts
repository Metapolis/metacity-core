/**
 * User authentication token use to authenticate a user
 */
export class UserAuthenticationTokenDTO {

    /**
     * User's email
     */
    private email: string;

    /**
     * User's password (encrypt)
     */
    private password: string;

    /**
     * User's domain request
     */
    private domain: string;

    /**
     * Getter lastName
     *
     * @returns {number}
     */
    public getEmail(): string {
        return this.email;
    }

    /**
     * Setter lastName
     *
     * @param email new lastName value
     */
    public setEmail(email: string): void {
        this.email = email;
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
