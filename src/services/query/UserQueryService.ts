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
