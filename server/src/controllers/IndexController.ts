import * as express from "express";
import {  inject, injectable } from "inversify";
import { Controller, Delete, Get, interfaces, Post } from "inversify-express-utils";
import {TrafficQueryService} from "../services/query/TrafficQueryService";
import {LoggerInstance} from "winston";
import {Utils} from "../common/Utils";
import * as HTTPStatusCodes from "http-status-codes";
import * as Path from "path";

/**
 * Index controllers is an example of controllers
 *
 * / route
 *
 * @class User
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
     * Traffic querying service
     */
    @inject("TrafficQueryService")
    private trafficQueryService: TrafficQueryService;

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
    public async findTraffic(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        this.logger.info("Find all traffic information");
        res.status(HTTPStatusCodes.OK);
        res.json(await this.trafficQueryService.findTrafficAccident());
    }

    /**
     * It's an exemple to get any information from ElasticSearch
     *
     * @param req it's call request
     * @param res it's response
     * @param next it's middleware to handle error
     *
     * @returns {Promise<void>}
     */
    @Get("toto")
    public async getIndex(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        this.logger.info("Deliver angular app");
        res.sendFile(Path.join(__dirname, "../../../client/index.html"));
    }
}
