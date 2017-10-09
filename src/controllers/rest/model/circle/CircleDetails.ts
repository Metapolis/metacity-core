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
     * When default circle is true, the circle is the circle by default
     */
    public defaultCircle: boolean;

    /**
     * Circle's role
     */
    public roles: Role[];

    /**
     * Circle's members
     */
    public members: User[] = [];
}
