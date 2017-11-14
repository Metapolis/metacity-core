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

import { FindUserQuery } from "../../common/query/FindUserQuery";
import { ResultList } from "../../common/ResultList";
import { UserDTO } from "./dto/user/UserDTO";

/**
 * Contains method to perform user query
 */
export interface UserQueryService {

    /**
     * Retrieves all user
     *
     * @param query Query use to find user
     *
     * @returns {Promise<ResultList<UserDTO>>}
     */
    findUsers(query: FindUserQuery): Promise<ResultList<UserDTO>>;
}
