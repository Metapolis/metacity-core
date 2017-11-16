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

import { CircleQueryService } from "../CircleQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { Circle } from "../../../persistence/domain/Circle";
import { CircleDTO } from "../dto/circle/CircleDTO";
import { Role } from "../../../common/enum/Role";
import { UserDTO } from "../dto/circle/UserDTO";
import { ResultList } from "../../../common/ResultList";
import { FindCircleQuery } from "../../../common/query/FindCircleQuery";

/**
 * Implementation of {@link CircleQueryService}
 */
@injectable()
export class CircleQueryServiceImpl implements CircleQueryService {

    /**
     * CircleQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleQueryServiceImpl.name);

    /**
     * Circle data access object
     */
    @inject("CircleDao")
    private circleDao: CircleDao;

    /**
     * Override
     */
    public async exists(id: number): Promise<boolean> {
        this.logger.debug("Check if circle with id '%s' exists", id);

        return await this.circleDao.exists(id);
    }

    /**
     * Override
     */
    public async isOwnedByLocalAuthority(circleId: number, localAuthorityId: number): Promise<boolean> {
        this.logger.debug("Check if circle '%s' is owned by localAuthority '%s'", circleId, localAuthorityId);
        return await this.circleDao.isOwnedByLocalAuthority(circleId, localAuthorityId);
    }

    /**
     * Override
     */
    public async getCircle(circleId: number): Promise<CircleDTO> | null {
        this.logger.debug("Retrieve circle '%s'", circleId);
        const circle: Circle = await this.circleDao.findById(circleId);

        if (circle === undefined) {
            this.logger.debug("Cannot retrieve circle '%s'", circleId);
            return null;
        }

        const circleDTO: CircleDTO = new CircleDTO();
        circleDTO.setId(circle.getId());
        circleDTO.setName(circle.getName());
        circleDTO.setDefaultCircle(circle.isDefaultCircle());

        for (const role of circle.getRoles()) {
            if (role in Role) {
                circleDTO.getRoles().push(role as Role);
            } else {
                this.logger.debug("The role '%s' is not supported", role);
            }
        }

        for (const user of (await circle.getUsers())) {
            const userDTO: UserDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setLastName(user.getLastName());
            userDTO.setFirstName(user.getFirstName());
            circleDTO.getMembers().push(userDTO);
        }
        return circleDTO;
    }

    /** Override */
    public async findCircles(query: FindCircleQuery): Promise<ResultList<CircleDTO>> {
        this.logger.debug("Retrieving circles");
        Utils.checkArgument(query != null, "Query cannot be null");
        Utils.checkArgument(query.getLocalAuthorityId() != null, "LocalAuthorityId must be set");
        Utils.checkArgument(query.getLocalAuthorityId() >= 0, "LocalAuthorityId cannot be negative");
        Utils.checkArgument(query.getOffset() != null, "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(query.getLimit() != null, "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        const circles: Circle[] = await this.circleDao.findBy(query);
        const circlesDTO: CircleDTO[] = [];
        if (circles.length === 0) {
            this.logger.debug("Could not retrieve any circle");
            return new ResultList<CircleDTO>(0, []);
        }

        for (const circle of circles) {
            const circleDTO: CircleDTO = new CircleDTO();
            circleDTO.setId(circle.getId());
            circleDTO.setName(circle.getName());
            circleDTO.setDefaultCircle(circle.isDefaultCircle());
            circlesDTO.push(circleDTO);
        }

        return new ResultList<CircleDTO>(circlesDTO.length, circlesDTO);
    }
}
