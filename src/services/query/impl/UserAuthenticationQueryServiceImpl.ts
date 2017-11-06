import { inject, injectable } from "inversify";
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
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";

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
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Override
     */
    public async authenticate(userAuthenticationToken: UserAuthenticationTokenDTO): Promise<UserTokenDTO> {
        Utils.checkArgument(userAuthenticationToken != null, "Token cannot be null or empty");
        this.logger.info("Begin authentication for user '%s'", userAuthenticationToken.getEmail());
        Utils.checkArgument(!Utils.isNullOrEmpty(userAuthenticationToken.getEmail()), "Email cannot be null or empty");
        Utils.checkArgument(!Utils.isNullOrEmpty(userAuthenticationToken.getDomain()), "Domain cannot be null or empty");
        const user: User = await this.userDao.findByEmail(userAuthenticationToken.getEmail());

        // Check user exists
        if (user === undefined) {
            this.logger.info("User '%s' not found", userAuthenticationToken.getEmail());
            throw new AccessDeniedError("User not found");
        }

        // Check password
        if (user.getPassword() !== userAuthenticationToken.getPassword()) {
            this.logger.info("Wrong password");
            throw new AccessDeniedError("Wrong password");
        }

        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(userAuthenticationToken.getDomain());
        // Check localAuthority exists
        if (localAuthority === undefined) {
            this.logger.info("LocalAuthority '%s' not found", userAuthenticationToken.getDomain());
            throw new AccessDeniedError("LocalAuthority not found");

        }
        this.logger.info("User '%s' is authenticated", userAuthenticationToken.getEmail());

        const userTokenDTO: UserTokenDTO = new UserTokenDTO();
        userTokenDTO.setId(user.getId());
        userTokenDTO.setEmail(user.getEmail());

        const jwtPayload: JWTPayload = new JWTPayload();
        jwtPayload.email = user.getEmail();
        jwtPayload.id = user.getId();
        // TODO update last connection of user after create JWT
        jwtPayload.lastConnection = user.getLastConnection();
        jwtPayload.roles = await user.getRoles();

        userTokenDTO.setToken(JWT.sign(jwtPayload, (await localAuthority.getCredential()).getSecret()));

        return userTokenDTO;
    }

}
