import * as Winston from "winston";
import { Config } from "../Config";
import { IllegalArgumentError } from "./error/IllegalArgumentError";
import { GeoShape } from "./GeoShape";
import { LocationPoint } from "./LocationPoint";

/**
 * It's an util class
 */
export class Utils {

    /**
     * Split point in Geo shape
     * @type {string}
     */
    private static POINT_SPLITTER_CHAR: string = "]|[";

    /**
     * Split element in Geo shape
     * @type {string}
     */
    private static ELEMENT_SPLITTER_CHAR: string = "|";

    /**
     * Create a new logger
     *
     * @param classReference Class name who clam a new logger
     *
     * @returns {LoggerInstance} created logger
     */
    public static createLogger(classReference: string): Winston.LoggerInstance {
        return new Winston.Logger({
            transports: [
                new (Winston.transports.Console)({
                    colorize: true,
                    formatter: (options) => {
                        // Return string will be passed to logger.
                        const logProperties: string[] = [];
                        logProperties.push(options.timestamp(),
                            options.level.toUpperCase(),
                            classReference, options.timestamp(),
                            (options.message ? options.message : ""),
                            (options.meta && Object.keys(options.meta).length ? "\n\t" + JSON.stringify(options.meta) : "" ));
                        return logProperties.join(" ");
                    },
                    level: Config.getAppLogLevel(),
                    timestamp: () => {
                        return new Date().toISOString();
                    },
                }),
            ],
        });
    }

    /**
     * Check the expression passed, and if it's false throw
     * an illegal argument error (catch by express to 400)
     *
     * @param expression expression to test
     * @param message message to throw
     */
    public static checkArgument(expression: boolean, message?: string) {
        if (!expression) {
            throw new IllegalArgumentError(message);
        }
    }

    /**
     * Check if string is null or empty
     *
     * @param str string to check
     * @returns {boolean} true means string is null or empty
     */
    public static isNullOrEmpty(str: string): boolean {
        return !str;
    }

    /**
     * Parse GeoShape from string
     *
     * @param geoShapeStr string to parse with a specific format "[[(d+)|(d+)]|[(d+)|(d+)]"
     *
     * @returns {GeoShape}
     */
    public static parseGeoShape(geoShapeStr: string): GeoShape {
        Utils.checkArgument(/^\[\[[-+]?[0-9]*\.?[0-9]+\|[-+]?[0-9]*\.?[0-9]+]\|\[[-+]?[0-9]*\.?[0-9]+\|[-+]?[0-9]*\.?[0-9]+]]/.test(geoShapeStr), "Geo shape query format incorrect");
        const splittedPoints: string[] = geoShapeStr.split(Utils.POINT_SPLITTER_CHAR);
        const arrayLatLongLeftUpPoint: string[] = splittedPoints[0].replace(/\[/gi, "").split(Utils.ELEMENT_SPLITTER_CHAR);
        const arrayLatLongRightDownPoint: string[] = splittedPoints[1].replace(/]/gi, "").split(Utils.ELEMENT_SPLITTER_CHAR);

        return new GeoShape(new LocationPoint(Number(arrayLatLongLeftUpPoint[0]), Number(arrayLatLongLeftUpPoint[1])),
            new LocationPoint(Number(arrayLatLongRightDownPoint[0]), Number(arrayLatLongRightDownPoint[1])));
    }
}
