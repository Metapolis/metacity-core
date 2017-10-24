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
        Utils.checkArgument(query != null, "Query cannot be null");
        Utils.checkArgument(query.getOffset() != null, "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(query.getLimit() != null, "Limit must be set");
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
