/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

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
    private static properties: Properties = process.env.NODE_ENV === "prod" ? Properties.initialize("config/properties_prod.json")
        : process.env.NODE_ENV === "debug" ? Properties.initialize("config/properties_debug.json")
            : Properties.initialize("config/properties_test.json");

    /**
     * Get ElasticSearch host
     *
     * @returns {string}
     */
    public static getElasticSearchHost(): string {
        return Config.properties.get("elasticsearch.host");
    }

    /**
     * Get ElasticSearch port
     *
     * @returns {number}
     */
    public static getElasticSearchLogLevel(): number {
        return Config.properties.get("elasticsearch.log_level");
    }

    /**
     * Get application port
     *
     * @returns {number}
     */
    public static getAppPort(): number {
        return Config.properties.get("app.port");
    }

    /**
     * Get application host
     *
     * @returns {string}
     */
    public static getAppHost(): string {
        return Config.properties.get("app.host");
    }

    /**
     * Get application log level
     *
     * @returns {string}
     */
    public static getAppLogLevel(): string {
        return Config.properties.get("app.log_level");
    }

    /**
     * Get index name traffic
     *
     * @returns {string}
     */
    public static getIndexNameTraffic(): string {
        return Config.properties.get("index_name_traffic");
    }

    /**
     * Get document name accident
     *
     * @returns {string}
     */
    public static getDocumentNameAccident(): string {
        return Config.properties.get("document_name_accident");
    }

    /**
     * Get index name traffic
     *
     * @returns {string}
     */
    public static getIndexNameSocialNetwork(): string {
        return Config.properties.get("index_name_social_network");
    }

    /**
     * Get document name accident
     *
     * @returns {string}
     */
    public static getDocumentNameTweet(): string {
        return Config.properties.get("document_name_tweet");
    }

    /**
     * Get index name politic
     *
     * @returns {string}
     */
    public static getIndexNamePolitic(): string {
        return Config.properties.get("index_name_politic");
    }

    /**
     * Get document name vote
     *
     * @returns {string}
     */
    public static getDocumentNameVote(): string {
        return Config.properties.get("document_name_vote");
    }

    /**
     * Get database name
     *
     * @returns {string}
     */
    public static getDatabaseName(): string {
        return Config.properties.get("database.name");
    }

    /**
     * Get database user
     *
     * @returns {string}
     */
    public static getDatabaseUser(): string {
        return Config.properties.get("database.user");
    }

    /**
     * Get database password
     *
     * @returns {string}
     */
    public static getDatabasePassword(): string {
        return Config.properties.get("database.password");
    }

    /**
     * Get database host
     *
     * @returns {string}
     */
    public static getDatabaseHost(): string {
        return Config.properties.get("database.host");
    }

    /**
     * Get database port
     *
     * @returns {number}
     */
    public static getDatabasePort(): number {
        return Config.properties.get("database.port");
    }

    /**
     * Get database dropSchema
     *
     * @returns {string}
     */
    public static isDatabaseDropSchema(): boolean {
        return Config.properties.get("database.drop_schema");
    }

    /**
     * Get database autooSchemaSync
     *
     * @returns {number}
     */
    public static isDatabaseAutoSchemaSync(): boolean {
        return Config.properties.get("database.auto_schema_sync");
    }
}
