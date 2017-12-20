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

import { CircleCommandService } from "../CircleCommandService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { SaveCircleCommandDTO } from "../dto/circle/SaveCircleCommandDTO";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { Circle } from "../../../persistence/domain/Circle";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { User } from "../../../persistence/domain/User";
import { isNullOrUndefined } from "util";
import { UpdateCircleCommandDTO } from "../dto/circle/UpdateCircleCommandDTO";
import { UserDao } from "../../../persistence/dao/UserDao";
import {NotFoundError} from "../../../common/error/NotFoundError";

/**
 * Implementation of {@link CircleCommandService}
 */
@injectable()
export class CircleCommandServiceImpl implements CircleCommandService {

    /**
     * CircleCommandServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleCommandServiceImpl.name);

    /**
     * Circle data access object
     */
    @inject("CircleDao")
    private circleDao: CircleDao;

    /**
     * User data access object
     */
    @inject("UserDao")
    private userDao: UserDao;

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Override
     */
    public async createCircle(command: SaveCircleCommandDTO): Promise<number> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        Utils.checkArgument(!isNullOrUndefined(command.isDefaultCircle()), "Default circle cannot be undefined or null");
        Utils.checkArgument(!isNullOrUndefined(command.getMembers()), "Circle members cannot be undefined or null");

        this.logger.debug("Begin circle creation for '%s'", command.getName());

        // Retrieve localAuthority with identifier
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findById(command.getLocalAuthorityId());

        // Check if localAuthority is found in database
        Utils.checkArgument(localAuthority !== undefined, "LocalAuthority for access key : '" + command.getLocalAuthorityId() + "' cannot be found");

        const circle: Circle = new Circle();
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        circle.setDefaultCircle(command.isDefaultCircle());

        // get reference of circle members list to add member
        const members: User[] = await circle.getUsers();
        for (const id of command.getMembers()) {
            members.push(await this.userDao.findById(id));
        }

        this.logger.debug("Create new circle");
        await this.circleDao.saveOrUpdate(circle);
        this.logger.debug("New circle created with id: '%s'", circle.getId());

        return circle.getId();
    }

    /**
     * Override
     */
    public async updateCircle(command: UpdateCircleCommandDTO): Promise<void> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!isNullOrUndefined(command.getId()), "Circle's identifier cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        Utils.checkArgument(!isNullOrUndefined(command.isDefaultCircle()), "Default circle cannot be undefined or null");

        this.logger.debug("Begin update circle with id '%s'", command.getId());

        // Retrieve localAuthority with identifier
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findById(command.getLocalAuthorityId());

        // Check if localAuthority is found in database
        Utils.checkArgument(localAuthority !== undefined, "LocalAuthority for id : '" + command.getLocalAuthorityId() + "' cannot be found");

        // Retrieve circle with identifier
        const circle: Circle = await this.circleDao.findById(command.getId());

        // Check if localAuthority is found in database
        Utils.checkArgument(circle !== undefined, "Circle with id '" + command.getId() + "' cannot be found");
        Utils.checkArgument((await circle.getLocalAuthority()).getId() === localAuthority.getId(), "Circle '" + circle.getId() + "' and localAuthority '" + localAuthority.getId() + "'have to be linked ");

        // Set new values
        circle.setDefaultCircle(command.isDefaultCircle());
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        const members: User[] = [];

        for (const id of command.getMembers()) {
            Utils.checkArgument(!isNullOrUndefined(await this.userDao.findById(id)), "User doesn't exist");
            members.push(await this.userDao.findById(id));
        }

        // https://github.com/typeorm/typeorm/issues/1034
        // fix to handle setter with promises
        circle.setUsers(Promise.resolve(members));
        await Promise.resolve();

        // Save circle
        await this.circleDao.saveOrUpdate(circle);
        this.logger.debug("Circle '%s' updated", circle.getId());
    }

    /**
     * Override
     */
    public async deleteCircle(circleId: number): Promise<void> {
        this.logger.debug("Begin deletion of circle '%s'", circleId);

        // Retrieve circle with identifier
        const circle: Circle = await this.circleDao.findById(circleId);

        // Check if localAuthority is found in database
        Utils.checkArgument(circle !== undefined, "Circle with id '" + circleId + "' cannot be found");

        await this.circleDao.deleteCircle(circle);

        this.logger.debug("Circle deleted");
    }
}
