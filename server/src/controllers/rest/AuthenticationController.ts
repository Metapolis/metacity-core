import { Controller, Delete, Get, interfaces, Next, Post, RequestBody, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { UserAuthenticationQueryService } from "../../services/query/UserAuthenticationQueryService";
import { Labeled } from "../../common/Labeled";
import { UserAuthenticationTokenDTO } from "../../services/query/dto/user/UserAuthenticationTokenDTO";
import { UserAuthenticationToken } from "./model/user/UserAuthenticationToken";

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
     * [Post description]
     * @param  {[type]} "/" [description]
     * @return {[type]}     [description]
     */
    @Post("/")
    public async authenticate(@RequestParam("login") login: string, @RequestBody() userToken: UserAuthenticationToken, @Next() next: Express.NextFunction): Promise<Labeled> {
        this.logger.debug("Begin authentication");
        // Build DTO
        const userTokenDTO: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        userTokenDTO.setUsername(userToken.username);
        userTokenDTO.setPassword(userToken.password);
        try {
            return await this.userAuthenticationQueryService.authenticate(userTokenDTO);
        } catch (e) {
            next(e);
        }
    }
}
