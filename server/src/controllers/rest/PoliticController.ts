import { Controller, Delete, Get, interfaces, Post } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { PoliticQueryService } from "../../services/query/PoliticQueryService";
import * as HTTPStatusCodes from "http-status-codes";
import * as Express from "express";

/**
 * API resources to delivery service to access to traffic element
 *
 * /api/traffics route
 *
 * @class PoliticController
 */
@Controller("/api/politics")
@injectable()
export class PoliticController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(PoliticController.name);

    /**
     * Politic querying service
     */
    @inject("PoliticQueryService")
    private politicQueryService: PoliticQueryService;

    /**
     * Get politic votes information
     *
     * @param req it's call request
     * @param res it's response
     * @param next it's middleware to handle error
     *
     * @returns {Promise<void>}
     */
    @Get("/votes")
    public async findVotes(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
        this.logger.info("Find all politic votes information");
        res.status(HTTPStatusCodes.OK);
        res.json(await this.politicQueryService.findPoliticVotes());
    }
}
