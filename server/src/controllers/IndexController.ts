import * as Express from "express";
import { inject, injectable } from "inversify";
import { Controller, Delete, Get, interfaces, Post } from "inversify-express-utils";
import { LoggerInstance } from "winston";
import { Utils } from "../common/Utils";
import * as Path from "path";

/**
 * Index controllers is an example of controllers
 *
 * / route
 *
 * @class IndexController
 */
@Controller("/")
@injectable()
export class IndexController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(IndexController.name);

    /**
     * It's an exemple to get any information from ElasticSearch
     *
     * @param req it's call request
     * @param res it's response
     * @param next it's middleware to handle error
     *
     * @returns {Promise<void>}
     */
    @Get("/")
    public async getIndex(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
        this.logger.info("Deliver angular app");
        res.sendFile(Path.join(__dirname, "../../../client/index.html"));
    }
}
