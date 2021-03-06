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

import { Controller, Get, interfaces, Post, QueryParam, RequestBody } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { SaveUser } from "./model/user/SaveUser";
import { UserCommandService } from "../../services/command/UserCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import { SaveUserCommandDTO } from "../../services/command/dto/user/SaveUserCommandDTO";
import { ResultList } from "../../common/ResultList";
import { User } from "./model/user/User";
import { SearchFilter } from "./model/common/SearchFilter";
import { FindUserQuery } from "../../common/query/FindUserQuery";
import { LogicalQueryCriteria } from "../../common/query/LogicalQueryCriteria";
import { UserDTO } from "../../services/query/dto/user/UserDTO";
import { UserQueryService } from "../../services/query/UserQueryService";
import { ClientControl } from "../../common/Decorators";
import { Role } from "../../common/enum/Role";

/**
 * API resources to manage user
 * /api/users
 * @class UserController
 */
@Controller("/api/users")
@injectable()
export class UserController implements interfaces.Controller {

    /**
     * UserController Logger
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserController.name);

    /**
     * User command service
     */
    @inject("UserCommandService")
    private userCommandService: UserCommandService;

    /**
     * User query service
     */
    @inject("UserQueryService")
    private userQueryService: UserQueryService;

    /**
     * Create a user
     *
     * @param {SaveUser} user to create
     * @returns {Promise<NumberIdentifier>} created user identifier
     */
    @ClientControl(Role.MANAGE_USER)
    @Post("/")
    public async createUser(@RequestBody() user: SaveUser): Promise<NumberIdentifier> {
        this.logger.debug("Begin user creation");
        const saveUserCommandDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        saveUserCommandDTO.setAvatarUrl(user.avatarUrl);
        saveUserCommandDTO.setFirstName(user.firstName);
        saveUserCommandDTO.setLastName(user.lastName);
        saveUserCommandDTO.setPassword(user.password);
        saveUserCommandDTO.setEmail(user.email);

        const userIdentifier: number = await this.userCommandService.createUser(saveUserCommandDTO);

        this.logger.debug("User created with identifier %s", userIdentifier);

        return new NumberIdentifier(userIdentifier);
    }

    /**
     * Get users information
     *
     * @param offset result offset
     * @param limit size of return result
     * @param q free text search filter
     *
     * @returns {Promise<ResultList<User>>}
     */
    @ClientControl(Role.MANAGE_USER)
    @Get("/")
    public async findUsers(@QueryParam("offset") offset: number,
                           @QueryParam("limit") limit: number,
                           @QueryParam("q") q: string): Promise<ResultList<User>> {
        Utils.checkArgument(offset != null, "Offset must be set");
        Utils.checkArgument(offset >= 0, "Offset cannot be negative");
        Utils.checkArgument(limit != null, "Size must be set");
        Utils.checkArgument(limit > 0, "Size must be superior to zero");

        this.logger.info("Find users information");
        let qSearchFilter: SearchFilter;
        if (!Utils.isNullOrEmpty(q)) {
            qSearchFilter = new SearchFilter(q);
        }

        const query: FindUserQuery = new FindUserQuery();
        query.setLimit(Number(limit));
        query.setOffset(Number(offset));
        // Prepare the hash tag filter
        if (qSearchFilter != null) {
            const mustParam: string[] = [];
            const shouldParams: string[] = [];

            // Parse must params
            for (const must of qSearchFilter.getMustValues()) {
                mustParam.push(must);
            }

            // Parse should params
            for (const should of qSearchFilter.getShouldValues()) {
                shouldParams.push(should);
            }

            // Create criteria
            const logicalQFilter: LogicalQueryCriteria<string> = new LogicalQueryCriteria<string>(mustParam, shouldParams);
            query.setQFilter(logicalQFilter);
        }

        const resultListUsers: ResultList<UserDTO> = await this.userQueryService.findUsers(query);
        const returnedUsers: User[] = [];

        for (const userDTO of resultListUsers.results) {
            const user: User = new User();
            user.id = userDTO.getId();
            user.firstName = userDTO.getFirstName();
            user.lastName = userDTO.getLastName();
            user.email = userDTO.getEmail();

            returnedUsers.push(user);
        }

        this.logger.info("'%s' users found", resultListUsers.total);

        return new ResultList<User>(resultListUsers.total, returnedUsers);
    }
}
