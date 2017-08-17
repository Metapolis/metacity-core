import { inject, injectable } from "inversify";
import { TrafficQueryService } from "../TrafficQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { UserAuthenticationQueryService } from "../UserAuthenticationQueryService";
import { UserAuthenticationTokenDTO } from "../dto/user/UserAuthenticationTokenDTO";
import * as JWT from "jsonwebtoken";
import { UserDao } from "../../../persistence/dao/UserDao";
import { User } from "../../../persistence/domain/User";
import { AccessDeniedError } from "../../../common/error/AccessDeniedError";
import { UserTokenDTO } from "../dto/user/UserTokenDTO";
import { JWTPayload } from "../../../common/security/JWTToken";
import { Collectivity } from "../../../persistence/domain/Collectivity";
import { CollectivityDao } from "../../../persistence/dao/CollectivityDao";

/**
 * Implementation of {@link UserAuthenticationQueryService}
 */
@injectable()
export class UserAuthenticationQueryServiceImpl implements UserAuthenticationQueryService {

    /**
     * UserAuthenticationQueryServiceImpl logger
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
     * Collectivity data access object
     */
    @inject("CollectivityDao")
    private collectivityDao: CollectivityDao;
    
    /**
     * Override
     */
    public async authenticate(userAuthenticationToken: UserAuthenticationTokenDTO): Promise<UserTokenDTO> {
        Utils.checkArgument(userAuthenticationToken != null, "Token cannot be null or empty");
        this.logger.info("Begin authentication for user '%s'", userAuthenticationToken.getUsername());
        Utils.checkArgument(!Utils.isNullOrEmpty(userAuthenticationToken.getUsername()), "Username cannot be null or empty");
        Utils.checkArgument(!Utils.isNullOrEmpty(userAuthenticationToken.getDomain()), "Domain cannot be null or empty");
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

        const collectivity: Collectivity = await this.collectivityDao.findById(userAuthenticationToken.getDomain());
        // Check collectivity exists
        if (collectivity === undefined) {
            this.logger.info("Collectivity '%s' not found", userAuthenticationToken.getDomain());
            throw new AccessDeniedError("Collectivity not found");

        }
        this.logger.info("User '%s' is authenticated", userAuthenticationToken.getUsername());

        const userTokenDTO: UserTokenDTO = new UserTokenDTO();
        userTokenDTO.setId(user.getId());
        userTokenDTO.setUsername(user.getUsername());

        const jwtPayload: JWTPayload = new JWTPayload();
        jwtPayload.username = user.getUsername();
        jwtPayload.id = user.getId();
        // TODO update last connection of user after create JWT
        jwtPayload.lastConnection = user.getLastConnection();
        jwtPayload.roles = await user.getRoles();

        userTokenDTO.setToken(JWT.sign(jwtPayload, collectivity.getSecret()));

        return userTokenDTO;
    }

}
