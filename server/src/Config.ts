import {Properties} from "ts-json-properties";

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
        return Config.properties.get("config.elasticsearch_host");
    }

    /**
     * Get ElasticSearch port
     *
     * @returns {number}
     */
    public static getElasticSearchLogLevel(): number {
        return Config.properties.get("config.elasticsearch_log_level");
    }

    /**
     * Get application port
     *
     * @returns {number}
     */
    public static getAppPort(): number {
        return Config.properties.get("config.app_port");
    }

    /**
     * Get application host
     *
     * @returns {string}
     */
    public static getAppHost(): string {
        return Config.properties.get("config.app_host");
    }

    /**
     * Get application log level
     *
     * @returns {string}
     */
    public static getAppLogLevel(): string {
        return Config.properties.get("config.app_log_level");
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
}
