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
     * User's email
     */
    public email: string;

    /**
     * User's roles
     */
    public roles: string[];
}
