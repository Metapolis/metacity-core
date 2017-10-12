/**
 * Contains all information of user token identifier
 */
export class UserTokenDTO {

    /**
     * User's email
     */
    private email: string;

    /**
     * User's identifier
     */
    private id: number;

    /**
     * User's token (JWT)
     */
    private token: string;

    /**
     * Getter id
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter id
     *
     * @param id new id value
     */
    public setId(id: number): void {
        this.id = id;
    }

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
     * Getter token
     *
     * @returns {number}
     */
    public getToken(): string {
        return this.token;
    }

    /**
     * Setter token
     *
     * @param token new token value
     */
    public setToken(token: string): void {
        this.token = token;
    }
}
