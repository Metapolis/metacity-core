import { Controller, interfaces, Next, Response, Post, RequestBody, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveCircleCommandDTO } from "../../services/command/dto/circles/SaveCircleCommandDTO";
import {CircleCommandService} from "../../services/command/CircleCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import {SaveCircle} from "./model/circle/SaveCircle";

/**
 * API resources to circle services
 *
 * /api/collectivity/id/circles route
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
}
