import { User } from "./User";

/**
 * Contains info to create circle
 */
export class SaveCircle {

    /**
     * Circle's name
     */
    public name: string;

    /**
     * Circle's roles
     */
    public roles: string[];

    /**
     * When default circle is true, the circle is the circle by default
     */
    public defaultCircle: boolean;

    /**
     * Circle's members
     */
    public members: number[];
}
