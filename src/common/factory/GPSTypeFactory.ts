import { GPSType } from "../enum/accident/GPSType";
import { UnsupportedOperationError } from "../error/UnsupportedOperationError";

/**
 * Factory use to create GPSType
 */
export class GPSTypeFactory {

    /**
     * Define binding with metropole value
     *
     * @type {string}
     */
    private static METROPOLE: string = "M";

    /**
     * Define binding with antille value
     *
     * @type {string}
     */
    private static ANTILLE: string = "A";

    /**
     * Define binding with guyane value
     *
     * @type {string}
     */
    private static GUYANE: string = "G";

    /**
     * Define binding with reunion value
     *
     * @type {string}
     */
    private static REUNION: string = "R";

    /**
     * Define binding with mayotte value
     *
     * @type {string}
     */
    private static MAYOTTE: string = "Y";

    /**
     * Get GPSType from string value ("M", "A", "G", "R", "Y")
     *
     * @param value
     *
     * @return {GPSType}
     */
    public getGpsType(value: string): GPSType {
        switch (value) {
            case GPSTypeFactory.METROPOLE:
                return GPSType.METROPOLE;
            case GPSTypeFactory.ANTILLE:
                return GPSType.ANTILLE;
            case GPSTypeFactory.GUYANE:
                return GPSType.GUYANNE;
            case GPSTypeFactory.REUNION:
                return GPSType.REUNION;
            case GPSTypeFactory.MAYOTTE:
                return GPSType.MAYOTTE;
            default:
                throw new UnsupportedOperationError("'" + value + "' is not supported");
        }
    }
}
