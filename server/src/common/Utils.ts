import * as Winston from "winston";
import { Config } from "../Config";
import { IllegalArgumentError } from "./exception/IllegalArgumentError";

/**
 * It's an util class
 */
export class Utils {

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
    public static checkArguments(expression: boolean, message?: string) {
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
}
