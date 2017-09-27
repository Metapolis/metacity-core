import { Controller, interfaces, Next, Response, Post, RequestBody, RequestParam, Put } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveCircleCommandDTO } from "../../services/command/dto/circles/SaveCircleCommandDTO";
import {CircleCommandService} from "../../services/command/CircleCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import {SaveCircle} from "./model/circle/SaveCircle";
import { UpdateCircleCommandDTO } from "../../services/command/dto/circles/UpdateCircleCommandDTO";
import { CircleQueryService } from "../../services/query/CircleQueryService";
import { NotFoundError } from "../../common/error/NotFoundError";
import * as HTTPStatusCodes from "http-status-codes";

/**
 * API resources to collectivities services
 *
 * /api/collectivities route
 *
 * @class CollectivityController
 */
@Controller("/api/collectivities")
@injectable()
export class CollectivityController implements interfaces.Controller {

    /**
     * CollectivityController Logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CollectivityController.name);

    /**
     * Circle command service
     */
    @inject("CircleCommandService")
    private circleCommandService: CircleCommandService;

    /**
     * Circle query service
     */
    @inject("CircleQueryService")
    private circleQueryService: CircleQueryService;

    /**
     * Create a circle
     *
     * @param {SaveCircle} circle to create
     * @param {string} accessKey :  collectivity identifier
     * @returns {Promise<NumberIdentifier>} created circle identifier
     */
    @Post("/:accessKey/circles")
    public async createCollectivityCircle(@RequestBody() circle: SaveCircle, @RequestParam("accessKey") accessKey: string): Promise<NumberIdentifier> {

        // We don't verify if collectivity exists
        // It will be done with @secured
        // Coming soon
        this.logger.debug("Begin creation");
        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setAvatarURL(circle.avatarURL);
        saveCircleCommandDTO.setName(circle.name);
        saveCircleCommandDTO.setRoles(circle.roles);
        saveCircleCommandDTO.setDescription(circle.description);
        saveCircleCommandDTO.setAccessKey(accessKey);

        const circleIdentifier: number = await this.circleCommandService.createCircle(saveCircleCommandDTO);

        return new NumberIdentifier(circleIdentifier);
    }

    /**
     * Update specific circle
     *
     * @param {SaveCircle} circle new values for circle
     * @param {string} accessKey collectivity identifier
     * @param {number} circleId circle identifier
     * @param {Express.Response} res Response to set 204
     */
    @Put("/:accessKey/circles/:circleid")
    public async updateCollectivityCircle(@RequestBody() circle: SaveCircle, @RequestParam("accessKey") accessKey: string, @RequestParam("circleid") circleId: number, @Response() res: Express.Response): Promise<void> {
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);

        if (!(await this.circleQueryService.exists(circleIdNumber))) {
            this.logger.debug("Circle with id '%s' cannot be found", circleId);
            throw new NotFoundError("Circle not found");
        }
        // We don't verify if collectivity exists
        // It will be done with @secured
        // Coming soon
        this.logger.debug("Begin update");
        const updateCircleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        updateCircleCommandDTO.setAvatarURL(circle.avatarURL);
        updateCircleCommandDTO.setName(circle.name);
        updateCircleCommandDTO.setRoles(circle.roles);
        updateCircleCommandDTO.setDescription(circle.description);
        updateCircleCommandDTO.setAccessKey(accessKey);
        updateCircleCommandDTO.setId(circleIdNumber);

        await this.circleCommandService.updateCircle(updateCircleCommandDTO);

        this.logger.debug("Circle '%s' is updated", circleIdNumber);
        // empty response temporary just because JS sucks
        res.sendStatus(HTTPStatusCodes.NO_CONTENT);
    }
}
