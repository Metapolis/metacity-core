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

import { Controller, interfaces, Post, RequestBody } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { UserAuthenticationQueryService } from "../../services/query/UserAuthenticationQueryService";
import { UserAuthenticationTokenDTO } from "../../services/query/dto/user/UserAuthenticationTokenDTO";
import { UserAuthenticationToken } from "./model/user/UserAuthenticationToken";
import { UserToken } from "./model/user/UserToken";
import { RequestAccessor } from "../../RequestAccessor";
import { LocalAuthorityQueryService } from "../../services/query/LocalAuthorityQueryService";
import { UserTokenDTO } from "../../services/query/dto/user/UserTokenDTO";
import { ClientControl } from "../../common/Decorators";
import { Role } from "../../common/enum/Role";

/**
 * API resources to delivery service to authentication
 *
 * /api/authentication route
 *
 * @class TrafficController
 */
@Controller("/api/authentications")
@injectable()
export class AuthenticationController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(AuthenticationController.name);

    /**
     * User authentication query service
     */
    @inject("UserAuthenticationQueryService")
    private userAuthenticationQueryService: UserAuthenticationQueryService;

    /**
     * LocalAuthority query service
     */
    @inject("LocalAuthorityQueryService")
    private localAuthorityQueryService: LocalAuthorityQueryService;

    /**
     * Authentication resources
     *
     * @param userAuthenticationToken user credential use to authentication
     */
    @ClientControl(Role.MANAGE_USER)
    @Post("/")
    public async authenticate(@RequestBody() userAuthenticationToken: UserAuthenticationToken): Promise<UserToken> {
        this.logger.debug("Begin authentication");
        // User token cannot be undefined or null
        // Build DTO
        const domain: string = RequestAccessor.getRequest().hostname.split(".")[0];
        const userAuthenticationTokenDTO: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        userAuthenticationTokenDTO.setEmail(userAuthenticationToken.email);
        userAuthenticationTokenDTO.setPassword(userAuthenticationToken.password);
        userAuthenticationTokenDTO.setDomain(domain);

        const user: UserTokenDTO = await this.userAuthenticationQueryService.authenticate(userAuthenticationTokenDTO);
        const userToken: UserToken = new UserToken();
        userToken.id = user.getId();
        userToken.email = user.getEmail();
        userToken.token = user.getToken();

        return userToken;
    }
}
