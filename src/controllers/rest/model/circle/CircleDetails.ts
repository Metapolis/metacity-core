import { Role } from "../../../../common/enum/Role";
import { User } from "./User";

/**
 * Contain circle details information
 */
export class CircleDetails {

    /**
     * Circle's identifier
     */
    public id: number;

    /**
     * Circle's name
     */
    public name: string;

    /**
     * Circle's description
     */
    public description: string;

    /**
     * Circle's role
     */
    public roles: Role[];

    /**
     * Circle's avatar url
     */
    public avatarUrl: string;

    /**
     * Circle's members
     */
    public members: User[];
}
