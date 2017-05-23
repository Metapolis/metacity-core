import { Luminosity } from "../../../../common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../../../common/enum/accident/AtmosphericCondition";

/**
 * Data transfer object with all details about a climatology
 */
export class ClimatologyDTO {

    /**
     * ClimatologyDTO luminosity
     */
    private luminosity: Luminosity;

    /**
     * ClimatologyDTO atmospheric condition
     */
    private atmosphericCondition: AtmosphericCondition;

    /**
     * Constructor from json
     *
     * @param json json used to construction
     */
    constructor(json: {}) {
        Object.assign(this, json);
    }

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
