import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { UserAuthenticationQueryService } from "../UserAuthenticationQueryService";
import { UserAuthenticationTokenDTO } from "../dto/user/UserAuthenticationTokenDTO";
import { Labeled } from "../../../common/Labeled";
import { UserDao } from "../../../persistence/dao/UserDao";
import { User } from "../../../persistence/domain/User";
import { AccessDeniedError } from "../../../common/error/AccessDeniedError";

/**
 * Implementation of {@link TrafficQueryService}
 */
@injectable()
export class UserAuthenticationQueryServiceImpl implements UserAuthenticationQueryService {

    /**
     * TrafficQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserAuthenticationQueryServiceImpl.name);

    /**
     * User data access object
     */
    @inject("UserDao")
    private userDao: UserDao;

    /**
     * Override
     */
    public async authenticate(userAuthenticationToken: UserAuthenticationTokenDTO): Promise<Labeled> {
        this.logger.info("Begin authentication for user '%s'", userAuthenticationToken.getUsername());
        Utils.checkArgument(!Utils.isNullOrEmpty(userAuthenticationToken.getUsername()), "Username cannot be null or empty");
        const user: User = await this.userDao.findByUsername(userAuthenticationToken.getUsername());

        // Check user exists
        if (user === undefined) {
            this.logger.info("User '%s' not found", userAuthenticationToken.getUsername());
            throw new AccessDeniedError("User not found");
        }

        // Check password
        if (user.getPassword() !== userAuthenticationToken.getPassword()) {
            this.logger.info("Wrong password");
            throw new AccessDeniedError("Wrong password");
        }
        this.logger.info("User '%s' is authenticated", userAuthenticationToken.getUsername());
        return new Labeled(user.getId(), user.getUsername());
    }

}
