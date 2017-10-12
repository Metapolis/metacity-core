import {
    Controller, interfaces, Next, Response, Post, RequestBody, RequestParam, Put,
    Get
} from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveCircleCommandDTO } from "../../services/command/dto/circle/SaveCircleCommandDTO";
import { CircleCommandService } from "../../services/command/CircleCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import { SaveCircle } from "./model/circle/SaveCircle";
import { UpdateCircleCommandDTO } from "../../services/command/dto/circle/UpdateCircleCommandDTO";
import { CircleQueryService } from "../../services/query/CircleQueryService";
import { NotFoundError } from "../../common/error/NotFoundError";
import * as HTTPStatusCodes from "http-status-codes";
import { CircleDetails } from "./model/circle/CircleDetails";
import { CircleDTO } from "../../services/query/dto/circle/CircleDTO";
import { User } from "./model/circle/User";

/**
 * API resources to local authorities services
 *
 * /api/local-authorities route
 *
 * @class LocalAuthorityController
 */
@Controller("/api/local-authorities")
@injectable()
export class LocalAuthorityController implements interfaces.Controller {

    /**
     * LocalAuthorityController Logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(LocalAuthorityController.name);

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
     * @param {string} accessKey :  localAuthority identifier
     * @returns {Promise<NumberIdentifier>} created circle identifier
     */
    @Post("/:accessKey/circles")
    public async createLocalAuthorityCircle(@RequestBody() circle: SaveCircle, @RequestParam("accessKey") accessKey: string): Promise<NumberIdentifier> {

        // We don't verify if localAuthority exists
        // It will be done with @secured
        // Coming soon
        this.logger.debug("Begin creation");
        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setDefaultCircle(circle.defaultCircle);
        saveCircleCommandDTO.setName(circle.name);
        saveCircleCommandDTO.setRoles(circle.roles);
        saveCircleCommandDTO.setAccessKey(accessKey);

        const circleIdentifier: number = await this.circleCommandService.createCircle(saveCircleCommandDTO);

        return new NumberIdentifier(circleIdentifier);
    }

    /**
     * Update specific circle
     *
     * @param {SaveCircle} circle new values for circle
     * @param {string} accessKey localAuthority identifier
     * @param {number} circleId circle identifier
     * @param {Express.Response} res Response to set 204
     */
    @Put("/:accessKey/circles/:circleid")
    public async updateLocalAuthorityCircle(@RequestBody() circle: SaveCircle, @RequestParam("accessKey") accessKey: string, @RequestParam("circleid") circleId: number, @Response() res: Express.Response): Promise<void> {
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);

        if (!(await this.circleQueryService.exists(circleIdNumber))) {
            this.logger.debug("Circle with id '%s' cannot be found", circleId);
            throw new NotFoundError("Circle not found");
        }
        // We don't verify if localAuthority exists
        // It will be done with @secured
        // Coming soon
        this.logger.debug("Begin update");
        const updateCircleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        updateCircleCommandDTO.setDefaultCircle(circle.defaultCircle);
        updateCircleCommandDTO.setName(circle.name);
        updateCircleCommandDTO.setRoles(circle.roles);
        updateCircleCommandDTO.setAccessKey(accessKey);
        updateCircleCommandDTO.setId(circleIdNumber);

        await this.circleCommandService.updateCircle(updateCircleCommandDTO);

        this.logger.debug("Circle '%s' is updated", circleIdNumber);
        // empty response temporary just because JS sucks
        res.sendStatus(HTTPStatusCodes.NO_CONTENT);
    }

    /**
     * Get information details of specific circle
     *
     * @param {number} localAuthorityId LocalAuthority identifier
     * @param {number} circleId Circle identifier
     *
     * @returns {Promise<Circle>} information of specific circle
     */
    @Get("/:localauthorityid/circles/:circleid")
    public async getLocalAuthorityCircleDetails(@RequestParam("localauthorityid") localAuthorityId: number, @RequestParam("circleid") circleId: number): Promise<CircleDetails> {
        this.logger.debug("Begin get circle");
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);
        const localAuthorityIdNumber: number = Number(localAuthorityId);

        // Check if circle and localAuthority exist and is circle is owned by localAuthority
        if (!(await this.circleQueryService.isOwnedByLocalAuthority(circleIdNumber, localAuthorityIdNumber))) {
            throw new NotFoundError("Circle is not owned by localAuthority");
        }

        // We don't verify if localAuthority exists
        // It will be done with @secured
        // Coming soon
        // Don't check if circle exists because the previous check all
        const circleDTO: CircleDTO = await this.circleQueryService.getCircle(circleIdNumber);
        const circleDetails: CircleDetails = new CircleDetails();
        circleDetails.id = circleDTO.getId();
        circleDetails.name = circleDTO.getName();
        circleDetails.defaultCircle = circleDTO.isDefaultCircle();
        circleDetails.roles = circleDTO.getRoles();

        for (const userDTO of circleDTO.getMembers()) {
            const user: User = new User();
            user.id = userDTO.getId();
            user.firstName = userDTO.getFirstName();
            user.lastName = userDTO.getLastName();
            circleDetails.members.push(user);
        }

        this.logger.debug("Circle '%s' is retrieved", circleIdNumber);

        return circleDetails;
    }
}
