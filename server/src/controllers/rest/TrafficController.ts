import { Controller, Delete, Get, interfaces, Post } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { TrafficQueryService } from "../../services/query/TrafficQueryService";
import * as HTTPStatusCodes from "http-status-codes";
import * as Express from "express";
import { AccidentMinimal } from "./model/accident/AccidentMinimal";
import { Location } from "./model/accident/Location";

/**
 * API resources to delivery service to access to traffic element
 *
 * /api/traffics route
 *
 * @class TrafficController
 */
@Controller("/api/traffics")
@injectable()
export class TrafficController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TrafficController.name);

    /**
     * Traffic querying service
     */
    @inject("TrafficQueryService")
    private trafficQueryService: TrafficQueryService;

    /**
     * Get traffic accident information
     *
     * @param req it's call request
     * @param res it's response
     * @param next it's middleware to handle error
     *
     * @returns {Promise<void>}
     */
    @Get("/accidents")
    public async findAccidents(req: Express.Request, res: Express.Response, next: Express.NextFunction): Promise<void> {
        this.logger.info("Find all traffic information");
        res.status(HTTPStatusCodes.OK);
        // res.json(await this.trafficQueryService.findTrafficAccidents());
        const accidents = await this.trafficQueryService.findTrafficAccidents();
        const returnedAccidents: AccidentMinimal[] = [];

        for (const accident of accidents) {
            const accidentMinimal: AccidentMinimal = new AccidentMinimal();
            accidentMinimal.setId(accident.getId());
            accidentMinimal.setLocation(new Location());
            accidentMinimal.getLocation().setAddress(accident.getLocationAddress());
            accidentMinimal.getLocation().setLatLon(
                [accident.getLocation().getLatitude(), accident.getLocation().getLongitude()]
            );

            returnedAccidents.push(accidentMinimal);
        }

        res.json(returnedAccidents);

    }
}
