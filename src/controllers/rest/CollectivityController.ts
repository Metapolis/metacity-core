import { Controller, interfaces, Next, Response, Post, RequestBody, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveCircleCommandDTO } from "../../services/command/dto/circles/SaveCircleCommandDTO";
import {CircleCommandService} from "../../services/command/CircleCommandService";
import { ActivityCircle } from "../../persistence/domain/ActivityCircle";
import { NumberIdentifier } from "./model/circle/SaveCircle";
/**
 * API resources to circle creation service
 *
 * /api/collectivity/id/circles route
 *
 * @class CollectivityController
 */
@Controller("/api/collectivity/id/circles")
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
     * Create a circle
     *
     * @param {ActivityCircle} activityCircle
     * @param {string} accessKey
     * @param {e.NextFunction} next
     * @param {e.Response} response
     * @returns {Promise<NumberIdentifier>}
     */
    @Post("/:accessKey/circles")

    public async createCollectivityCircle(@RequestBody() activityCircle: ActivityCircle, @RequestParam("accessKey") accessKey: string, @Next() next: Express.NextFunction, @Response() response: Express.Response): Promise<NumberIdentifier> {
        this.logger.debug("Begin creation");
        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setAvatarURL(activityCircle.getAvatarUrl());
        saveCircleCommandDTO.setName(activityCircle.getName());
        saveCircleCommandDTO.setRoles(activityCircle.getRoles());
        saveCircleCommandDTO.setDescription(activityCircle.getDescription());
        saveCircleCommandDTO.setAccessKey(accessKey);

        const circleIdentifier: number = await this.circleCommandService.createCircle(saveCircleCommandDTO);

        return new NumberIdentifier(circleIdentifier);
    }
}
