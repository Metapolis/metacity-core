import { Properties } from "ts-json-properties";

/**
 * Contain all access to config properties
 */
export class Config {

    /**
     * Application properties
     *
     * @type {Properties}
     */
    private static properties: Properties = Properties.initialize("config/properties.json");

    /**
     * Get ElasticSearch host
     *
     * @returns {string}
     */
    public static getElasticSearchHost(): string {
        return Config.properties.get("config.elasticsearch.host");
    }

    /**
     * Get ElasticSearch port
     *
     * @returns {number}
     */
    public static getElasticSearchLogLevel(): number {
        return Config.properties.get("config.elasticsearch.log_level");
    }

    /**
     * Get application port
     *
     * @returns {number}
     */
    public static getAppPort(): number {
        return Config.properties.get("config.app.port");
    }

    /**
     * Get application host
     *
     * @returns {string}
     */
    public static getAppHost(): string {
        return Config.properties.get("config.app.host");
    }

    /**
     * Get application log level
     *
     * @returns {string}
     */
    public static getAppLogLevel(): string {
        return Config.properties.get("config.app.log_level");
    }

    /**
     * Get index name traffic
     *
     * @returns {string}
     */
    public static getIndexNameTraffic(): string {
        return Config.properties.get("config.index_name_traffic");
    }

    /**
     * Get document name accident
     *
     * @returns {string}
     */
    public static getDocumentNameAccident(): string {
        return Config.properties.get("config.document_name_accident");
    }

    /**
     * Get index name politic
     *
     * @returns {string}
     */
    public static getIndexNamePolitic(): string {
        return Config.properties.get("config.index_name_politic");
    }

    /**
     * Get document name vote
     *
     * @returns {string}
     */
    public static getDocumentNameVote(): string {
        return Config.properties.get("config.document_name_vote");
    }

    /**
     * Get database name
     *
     * @returns {string}
     */
    public static getDatabaseName(): string {
        return Config.properties.get("config.database.name");
    }

    /**
     * Get database user
     *
     * @returns {string}
     */
    public static getDatabaseUser(): string {
        return Config.properties.get("config.database.user");
    }

    /**
     * Get database password
     *
     * @returns {string}
     */
    public static getDatabasePassword(): string {
        return Config.properties.get("config.database.password");
    }

    /**
     * Get database host
     *
     * @returns {string}
     */
    public static getDatabaseHost(): string {
        return Config.properties.get("config.database.host");
    }

    /**
     * Get database port
     *
     * @returns {number}
     */
    public static getDatabasePort(): number {
        return Config.properties.get("config.database.port");
    }
}
