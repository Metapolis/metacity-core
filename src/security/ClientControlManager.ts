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

import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../common/Utils";
import { AccessDeniedError } from "../common/error/AccessDeniedError";
import { isNullOrUndefined } from "util";
import { CredentialDao } from "../persistence/dao/CredentialDao";
import { Credential } from "../persistence/domain/Credential";
import CryptoJS = require("crypto-js");
import { ResultList } from "../common/ResultList";
import { LocalAuthority } from "../persistence/domain/LocalAuthority";
import { LocalAuthorityDao } from "../persistence/dao/LocalAuthorityDao";
import { HttpLocalAuthorityProvider } from "./HttpLocalAuthorityProvider";

/**
 * Contain all services to manage security
 */
@injectable()
export class ClientControlManager {

    /**
     * User control manager's logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(ClientControlManager.name);

    /**
     * Credential data access object
     */
    @inject("CredentialDao")
    private credentialDao: CredentialDao;

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Http LocalAuthority provider for all request
     */
    @inject("HttpLocalAuthorityProvider")
    private httpLocalAuthorityProvider: HttpLocalAuthorityProvider;

    /**
     * Client access param name
     */
    private static CLIENT_ACCESS_KEY: string = "accesskey";

    /**
     * Three minutes in timestamp
     */
    private static THREE_MINUTES: number = 180000;

    /**
     * Authenticate client
     *
     * @param {string} path path of query
     * @param {string} signature signature of query
     * @param {Map<string, string | string[]>} parameterMap params of query
     * @param {number} timestamp timestamp query
     * @param {string} method method query
     *
     * @returns {Promise<string[]>} array of client role
     */
    public async authenticateClient(path: string, signature: string, parameterMap: Map<string, string | string[]>, timestamp: number, method: string): Promise<string[]> {
        Utils.checkArgument(!Utils.isNullOrEmpty(path));
        Utils.checkArgument(!Utils.isNullOrEmpty(method));
        Utils.checkArgument(!isNullOrUndefined(timestamp));
        Utils.checkArgument(!isNullOrUndefined(parameterMap));
        Utils.checkArgument(!Utils.isNullOrEmpty(signature));
        Utils.checkArgument(parameterMap.has(ClientControlManager.CLIENT_ACCESS_KEY), "Access key param not found");
        const currentTimeMillis: number = (new Date()).getTime();
        if (timestamp > currentTimeMillis || currentTimeMillis > timestamp + ClientControlManager.THREE_MINUTES) {
            throw new AccessDeniedError("Call expired for this time '" + timestamp + "'");
        }
        const accessKey: string = parameterMap.get(ClientControlManager.CLIENT_ACCESS_KEY) as string;

        const credential: Credential | undefined = await this.credentialDao.findByAccessKey(accessKey);
        if (credential === undefined) {
            throw new AccessDeniedError("No credential found for accessKey '" + accessKey + "'");
        }

        const expectedSignature = ClientControlManager.getExpectedSignature(credential.getAccessKey(), credential.getSecret(), path, timestamp, method, parameterMap);
        if (expectedSignature !== signature) {
            throw new AccessDeniedError("Invalid signature. Found '" + signature + "' instead of '" + expectedSignature + "'");
        }
        const localAuthority: LocalAuthority | undefined = await this.localAuthorityDao.findByCredentialAccessKey(accessKey);
        if (localAuthority !== undefined) {
            this.httpLocalAuthorityProvider.set(localAuthority);
        }

        this.logger.debug("Authentication successful for client '%s'", credential.getAccessKey());

        return credential.getRoles();
    }

    /**
     * Compute signature
     *
     * @param {string} accessKey credential's accessKey
     * @param {string} secret credential's secret
     * @param {string} path path of query
     * @param {number} timestamp call of query
     * @param {string} method method query
     * @param {Map<string, string | string[]>} parameterMap parameters of query
     *
     * @return {string} a computed signature
     */
    private static getExpectedSignature(accessKey: string, secret: string, path: string, timestamp: number, method: string, parameterMap: Map<string, string | string[]>): string {
        let signature: string = "";
        signature = CryptoJS.SHA512(signature.concat(path, ":", accessKey, ":", secret)).toString();

        // Sort params by name asc
        const paramNames: string[] = [];
        const names: IterableIterator<string> = parameterMap.keys();
        for (const name of names) {
            paramNames.push(name);
        }
        paramNames.sort();

        // Appends param names and values to signature
        for (const name of paramNames) {
            signature = signature.concat(":", name, ":");
            let values: string[] = [];
            if (parameterMap.get(name) instanceof Array) {
                values = parameterMap.get(name) as string[];
            } else {
                values.push(parameterMap.get(name) as string);
            }

            // Sort values
            values.sort();
            signature = signature.concat(values.join("/"));
        }

        return CryptoJS.SHA512(method + ":" + String(timestamp) + ":" + signature).toString();
    }
}
