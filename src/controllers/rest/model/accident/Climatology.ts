import { Luminosity } from "../../../../common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../../../common/enum/accident/AtmosphericCondition";

/**
 * Data transfer object with all details about a climatology
 */
export class Climatology {

    /**
     * Climatology luminosity (ref: Luminosity)
     */
    public luminosity: string;

    /**
     * Climatology atmospheric condition (ref: AtmosphericCondition)
     */
    public atmosphericCondition: string;
}
