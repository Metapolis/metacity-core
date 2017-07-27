/**
 * Contains all information of jwt payload
 */
export class JWTPayload {

    /**
     * User's identifier
     */
    public id: number;

    /**
     * User's last connection
     */
    public lastConnection: number;

    /**
     * User's username
     */
    public username: string;

    /**
     * User's roles
     */
    public roles: string[];
}
