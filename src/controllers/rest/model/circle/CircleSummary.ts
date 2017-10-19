import { Role } from "../../../../common/enum/Role";
import { User } from "./User";

/**
 * Contains basic circle information
 */
export class CircleSummary {

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
     * Default constructor
     */
    constructor() {
    }
}
