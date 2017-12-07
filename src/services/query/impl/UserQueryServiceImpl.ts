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

import { UserQueryService } from "../UserQueryService";
import { inject, injectable } from "inversify";
import { FindUserQuery } from "../../../common/query/FindUserQuery";
import { ResultList } from "../../../common/ResultList";
import { UserDTO } from "../dto/user/UserDTO";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { UserDao } from "../../../persistence/dao/UserDao";
import { User } from "../../../persistence/domain/User";
import { isNullOrUndefined } from "util";

/**
 * Implementation of {@link UserQueryService}
 */
@injectable()
export class UserQueryServiceImpl implements UserQueryService {

    /**
     * UserQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserQueryServiceImpl.name);

    /**
     * User data access object
     */
    @inject("UserDao")
    private userDao: UserDao;

    /**
     * Override
     *
     * @param query
     */
    public async findUsers(query: FindUserQuery): Promise<ResultList<UserDTO>> {
        this.logger.info("Retrieve users in elastic search");
        Utils.checkArgument(!isNullOrUndefined(query), "Query cannot be null");
        Utils.checkArgument(!isNullOrUndefined(query.getOffset()), "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(!isNullOrUndefined(query.getLimit()), "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        const users: User[] = await this.userDao.findBy(query);
        const count: number = await this.userDao.countBy(query);
        const userDTOs: UserDTO[] = [];

        for (const user of users) {
            const userDTO: UserDTO = new UserDTO();
            userDTO.setLastName(user.getLastName());
            userDTO.setFirstName(user.getFirstName());
            userDTO.setId(user.getId());
            userDTO.setEmail(user.getEmail());
            userDTOs.push(userDTO);
        }

        return new ResultList<UserDTO>(count, userDTOs);
    }
}
