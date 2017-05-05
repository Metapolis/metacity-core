import { Controller, Delete, Get, interfaces, Post, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";

/**
 * API resources to delivery service to authentication
 *
 * /api/authentication route
 *
 * @class TrafficController
 */
@Controller("/api/authentication")
@injectable()
export class AuthenticationController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(AuthenticationController.name);

    @Get("/:login")
    public authenticate(@RequestParam("login") login: string, req: Express.Request, res: Express.Response, next: Express.NextFunction) {

    }

}
