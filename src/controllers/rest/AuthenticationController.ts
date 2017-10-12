import { Controller, Delete, Get, interfaces, Next, Post, RequestBody, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { UserAuthenticationQueryService } from "../../services/query/UserAuthenticationQueryService";
import { Labeled } from "../../common/Labeled";
import { UserAuthenticationTokenDTO } from "../../services/query/dto/user/UserAuthenticationTokenDTO";
import { UserAuthenticationToken } from "./model/user/UserAuthenticationToken";
import { UserToken } from "./model/user/UserToken";
import { RequestAccessor } from "../../RequestAccessor";
import { LocalAuthorityQueryService } from "../../services/query/LocalAuthorityQueryService";
import * as JWT from "jsonwebtoken";
import { UserTokenDTO } from "../../services/query/dto/user/UserTokenDTO";
import { LocalAuthorityDTO } from "../../services/query/dto/localauthority/LocalAuthorityDTO";

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
     * @param next next express function
     */
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
