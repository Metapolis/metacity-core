import * as Winston from "winston";
import { Config } from "../Config";

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
}
