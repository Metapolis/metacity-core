/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { Controller, Delete, Get, interfaces, Post, Put, QueryParam, RequestBody, RequestParam, Response } from "inversify-express-utils";
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
import { ClientControl } from "../../common/Decorators";
import { Role } from "../../common/enum/Role";
import { CircleSummary } from "./model/circle/CircleSummary";
import { ResultList } from "../../common/ResultList";
import { FindCircleQuery } from "../../common/query/FindCircleQuery";
import { LocalAuthorityQueryService } from "../../services/query/LocalAuthorityQueryService";

/**
 * API resources to Local authorities services
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
     * Local authority query service
     */
    @inject("LocalAuthorityQueryService")
    private localAuthorityQueryService: LocalAuthorityQueryService;

    /**
     * Find circles, filter result
     *
     * @param {number} localAuthorityId: localAuthority identifier
     * @param {number} limit: number of results to request
     * @param {number} offset: number of hit to skip
     *
     * @returns {Promise<ResultList<CircleSummary>>} list of circles summaries
     */
    @ClientControl(Role.MANAGE_CIRCLE)
    @Get("/:localauthorityid/circles")
    public async findLocalAuthorityCircles(@RequestParam("localauthorityid") localAuthorityId: number,
                                           @QueryParam("limit") limit: number,
                                           @QueryParam("offset") offset: number): Promise<ResultList<CircleSummary>> {
        this.logger.debug("Begin find circles");
        const localAuthorityIdNumber: number = Number(localAuthorityId);
        if (!(await this.localAuthorityQueryService.isExists(localAuthorityIdNumber))) {
            this.logger.debug("Local authority with id '%s' cannot be found", localAuthorityIdNumber);
            throw new NotFoundError("Local authority not found");
        }

        const query: FindCircleQuery = new FindCircleQuery();
        query.setLocalAuthorityId(localAuthorityIdNumber);
        query.setLimit(Number(limit));
        query.setOffset(Number(offset));

        const circleResultList: ResultList<CircleDTO> = await this.circleQueryService.findCircles(query);
        const circleSummaries: CircleSummary[] = [];
        for (const circleDTO of circleResultList.results) {
            const circleSummary: CircleSummary = new CircleSummary();
            circleSummary.id = circleDTO.getId();
            circleSummary.name = circleDTO.getName();
            circleSummary.defaultCircle = circleDTO.isDefaultCircle();
            circleSummaries.push(circleSummary);
        }
        this.logger.debug("%d Circles retrieved", circleResultList.total);

        return new ResultList<CircleSummary>(circleResultList.total, circleSummaries);
    }

    /**
     * Create a circle
     *
     * @param {SaveCircle} circle to create
     * @param {string} localAuthorityId :  localAuthority identifier
     *
     * @returns {Promise<NumberIdentifier>} created circle identifier
     */
    @ClientControl(Role.MANAGE_CIRCLE)
    @Post("/:localauthorityid/circles")
    public async createLocalAuthorityCircle(@RequestBody() circle: SaveCircle, @RequestParam("localauthorityid") localAuthorityId: number): Promise<NumberIdentifier> {
        this.logger.debug("Begin creation");
        const localAuthorityIdNumber: number = Number(localAuthorityId);
        if (!(await this.localAuthorityQueryService.isExists(localAuthorityIdNumber))) {
            this.logger.debug("Local authority with id '%s' cannot be found", localAuthorityIdNumber);
            throw new NotFoundError("Local authority not found");
        }

        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setDefaultCircle(circle.defaultCircle);
        saveCircleCommandDTO.setName(circle.name);
        saveCircleCommandDTO.setRoles(circle.roles);
        saveCircleCommandDTO.setMembers(circle.members);
        saveCircleCommandDTO.setLocalAuthorityId(Number(localAuthorityId));

        const circleIdentifier: number = await this.circleCommandService.createCircle(saveCircleCommandDTO);

        return new NumberIdentifier(circleIdentifier);
    }

    /**
     * Update specific circle
     *
     * @param {SaveCircle} circle new values for circle
     * @param {string} localAuthorityId localAuthority identifier
     * @param {number} circleId circle identifier
     * @param {Express.Response} res Response to set 204
     */
    @ClientControl(Role.MANAGE_CIRCLE)
    @Put("/:localauthorityid/circles/:circleid")
    public async updateLocalAuthorityCircle(@RequestBody() circle: SaveCircle, @RequestParam("localauthorityid") localAuthorityId: number, @RequestParam("circleid") circleId: number, @Response() res: Express.Response): Promise<void> {
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);
        const localAuthorityIdNumber: number = Number(localAuthorityId);

        if (!(await this.circleQueryService.isOwnedByLocalAuthority(circleIdNumber, localAuthorityIdNumber))) {
            this.logger.debug("Circle with id '%s' cannot be found or local authority with '%s' does not exists is circle not owned by local authority", circleId, localAuthorityId);
            throw new NotFoundError("Circle or local authority not found or not owned");
        }

        this.logger.debug("Begin update");
        const updateCircleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        updateCircleCommandDTO.setDefaultCircle(circle.defaultCircle);
        updateCircleCommandDTO.setName(circle.name);
        updateCircleCommandDTO.setRoles(circle.roles);
        updateCircleCommandDTO.setMembers(circle.members);
        updateCircleCommandDTO.setLocalAuthorityId(localAuthorityIdNumber);
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
    @ClientControl(Role.MANAGE_CIRCLE)
    @Get("/:localauthorityid/circles/:circleid")
    public async getLocalAuthorityCircleDetails(@RequestParam("localauthorityid") localAuthorityId: number, @RequestParam("circleid") circleId: number): Promise<CircleDetails> {
        this.logger.debug("Begin get circle");
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);
        const localAuthorityIdNumber: number = Number(localAuthorityId);

        // Check if circle and localAuthority exist and is circle is owned by localAuthority
        if (!(await this.circleQueryService.isOwnedByLocalAuthority(circleIdNumber, localAuthorityIdNumber))) {
            this.logger.debug("Circle with id '%s' cannot be found or local authority with '%s' does not exists is circle not owned by local authority", circleId, localAuthorityId);
            throw new NotFoundError("Circle or local authority not found or not owned");
        }

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
            user.email = userDTO.getEmail();
            circleDetails.members.push(user);
        }

        this.logger.debug("Circle '%s' is retrieved", circleIdNumber);

        return circleDetails;
    }

    /**
     * Delete specific circle
     *
     * @param {number} localAuthorityId LocalAuthority identifier
     * @param {number} circleId Circle identifier
     * @param {Express.Response} res Response to set 204
     */
    @ClientControl(Role.MANAGE_CIRCLE)
    @Delete("/:localauthorityid/circles/:circleid")
    public async deleteLocalAuthorityCircle(@RequestParam("localauthorityid") localAuthorityId: number, @RequestParam("circleid") circleId: number, @Response() res: Express.Response): Promise<void> {
        this.logger.debug("Begin delete circle '%s'", circleId);
        // I have to do this, because express can only parse string
        const circleIdNumber: number = Number(circleId);
        const localAuthorityIdNumber: number = Number(localAuthorityId);

        // Check if circle and localAuthority exist and is circle is owned by localAuthority
        if (!(await this.circleQueryService.isOwnedByLocalAuthority(circleIdNumber, localAuthorityIdNumber))) {
            this.logger.debug("Circle with id '%s' cannot be found or local authority with '%s' does not exists is circle not owned by local authority", circleId, localAuthorityId);
            throw new NotFoundError("Circle or local authority not found or not owned");
        }

        // We don't verify if localAuthority isExists
        // It will be done with @secured
        // Coming soon
        // Don't check if circle isExists because the previous check all
        await this.circleCommandService.deleteCircle(circleIdNumber);

        this.logger.debug("Circle '%s' is deleted", circleIdNumber);

        // empty response temporary just because JS sucks
        res.sendStatus(HTTPStatusCodes.NO_CONTENT);
    }
}
