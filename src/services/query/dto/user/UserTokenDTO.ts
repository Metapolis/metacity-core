/**
 * Contains all information of user token identifier
 */
export class UserTokenDTO {

    /**
     * User's username
     */
    private username: string;

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
