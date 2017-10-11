import {UserCommandService} from "../UserCommandService";
import {inject, injectable} from "inversify";
import {Client} from "elasticsearch";
import {Utils} from "../../../common/Utils";
import {LoggerInstance} from "winston";
import {UserDao} from "../../../persistence/dao/UserDao";
import { SaveUserCommandDTO } from "../dto/user/SaveUserCommandDTO";
import {User} from "../../../persistence/domain/User";
import {isNullOrUndefined} from "util";

/**
 * Implementation of {@link UserCommandService}
 */
@injectable()
export class UserCommandServiceImpl implements UserCommandService {

    /**
     * UserCommandService logger
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserCommandServiceImpl.name);

    /**
     * User data access object
     */
    @inject("UserDao")
    private userDao: UserDao;

    /**
     * Override
     */
    public async createUser(command: SaveUserCommandDTO): Promise<number> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getFirstName()), "First name cannot be null or empty");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getLastName()), "Last name cannot be null or empty");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getPassword()), "Password cannot be null or empty");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getEmail()), "Email cannot be null or empty");

        this.logger.debug("Begin user creation for '%s'", command.getEmail());

        const user: User = new User();
        user.setPassword(command.getPassword());
        user.setFirstName(command.getFirstName());
        user.setLastName(command.getLastName());
        user.setEmail(command.getEmail());
        user.setAvatarURL(command.getAvatarUrl());

        this.logger.debug("Create new user");
        await this.userDao.saveOrUpdate(user);

        this.logger.debug("New user created with id: '%s'", user.getId());
        return user.getId();

    }

}
