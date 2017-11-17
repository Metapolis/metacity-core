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
import * as JWT from "jsonwebtoken";
import { Utils } from "../../Utils";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { JWTPayload } from "../JWTToken";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { AccessDeniedError } from "../../error/AccessDeniedError";

/**
 * Contain all services to manage security
 */
@injectable()
export class UserControlManager {

    /**
     * User control manager's logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserControlManager.name);

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Authenticate user with JWT
     *
     * @param domain domain to determine the localAuthority
     * @param jwt the json web token
     */
    public async authenticate(domain: string, jwt: string): Promise<JWTPayload> {
        // Retrieve localAuthority to get the secret
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(domain);
        if (localAuthority === undefined) {
            this.logger.error("LocalAuthority not found");
            throw new AccessDeniedError("Access denied");
        }
        const jwtPayload: JWTPayload = (JWT.verify(jwt, (await localAuthority.getCredential()).getSecret()) as JWTPayload);
        // JWT library cannot convert id to number
        jwtPayload.id = Number(jwtPayload.id);

        return jwtPayload;
    }
}
