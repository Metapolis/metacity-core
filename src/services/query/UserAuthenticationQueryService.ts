import { UserAuthenticationTokenDTO } from "./dto/user/UserAuthenticationTokenDTO";
import { Labeled } from "../../common/Labeled";
import { UserTokenDTO } from "./dto/user/UserTokenDTO";

/**
 * Contains method to perform user authentication query
 */
export interface UserAuthenticationQueryService {

    /**
     * Retrieves all traffic accident
     *
     * @param userAuthenticationToken token use to authenticate user
     *
     * @returns {Labeled}
     */
    authenticate(userAuthenticationToken: UserAuthenticationTokenDTO): Promise<UserTokenDTO>;
}
