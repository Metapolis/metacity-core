import { Location } from "./Location";
import { Climatology } from "./Climatology";

/**
 * Contains accident summary info
 */
export class AccidentSummary {

    /**
     * Accident's id
     */
    public id: number;

    /**
     * Accident's location
     */
    public location: Location;

    /**
     * Car accident's collision type (ref: CollisionType)
     */
    public collisionType: string;

    /**
     * Car accident's climatology
     */
    public climatology: Climatology;
}
