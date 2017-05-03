import { GPSType } from "../accidentEnums/GPSType";
import { UnsupportedOperationError } from "../exception/UnsupportedOperationError";

/**
 * Factory use to create GPSType
 */
export class GPSTypeFactory {

    /**
     * Define binding with metropole value
     *
     * @type {string}
     */
    private static metropole: string = "M";

    /**
     * Define binding with antille value
     *
     * @type {string}
     */
    private static antille: string = "A";

    /**
     * Define binding with guyane value
     *
     * @type {string}
     */
    private static guyane: string = "G";

    /**
     * Define binding with reunion value
     *
     * @type {string}
     */
    private static reunion: string = "R";

    /**
     * Define binding with mayotte value
     *
     * @type {string}
     */
    private static mayotte: string = "Y";

    /**
     * Get GPSType from string value ("M", "A", "G", "R", "Y")
     *
     * @param value
     *
     * @return {GPSType}
     */
    public getGpsType(value: string): GPSType {
        switch (value) {
            case GPSTypeFactory.metropole:
                return GPSType.Metropole;
            case GPSTypeFactory.antille:
                return GPSType.Antille;
            case GPSTypeFactory.guyane:
                return GPSType.Guyane;
            case GPSTypeFactory.reunion:
                return GPSType.Reunion;
            case GPSTypeFactory.mayotte:
                return GPSType.Mayotte;
            default:
                throw new UnsupportedOperationError("'" + value + "' is not supported");
        }
    }
}
