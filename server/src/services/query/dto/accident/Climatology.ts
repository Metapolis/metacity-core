import { Luminosity } from "../../../../common/accidentEnums/Luminosity";
import { AtmosphericCondition } from "../../../../common/accidentEnums/AtmosphericCondition";

/**
 * Contains all details about a climatology
 */
export class Climatology {

    /**
     * Climatology luminosity
     */
    private luminosity: Luminosity;

    /**
     * Climatology atmospheric condition
     */
    private atmosphericCondition: AtmosphericCondition;

    /**
     * Getter luminosity
     *
     * @returns {Luminosity}
     */
    public getLuminosity(): Luminosity {
        return this.luminosity;
    }

    /**
     * Setter luminosity
     *
     * @param luminosity new luminosity value
     */
    public setLuminosity(luminosity: Luminosity): void {
        this.luminosity = luminosity;
    }

    /**
     * Getter atmosphericCondition
     *
     * @returns {AtmosphericCondition}
     */
    public getAtmosphericCondition(): AtmosphericCondition {
        return this.atmosphericCondition;
    }

    /**
     * Setter atmosphericCondition
     *
     * @param atmosphericCondition new atmospheric condition value
     */
    public setAtmosphericCondition(atmosphericCondition: AtmosphericCondition): void {
        this.atmosphericCondition = atmosphericCondition;
    }
}
