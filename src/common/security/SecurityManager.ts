import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../Utils";
import { LocalAuthorityDao } from "../../persistence/dao/LocalAuthorityDao";
import { JWTPayload } from "./JWTToken";
import { LocalAuthority } from "../../persistence/domain/LocalAuthority";
import { AccessDeniedError } from "../error/AccessDeniedError";
import * as JWT from "jsonwebtoken";

/**
 * Contain all services to manage security
 */
@injectable()
export class SecurityManager {

    /**
     * Security manager's logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(SecurityManager.name);

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Authenticate user with JWT
     *
     * @param domain domain to determine the localAuthority
     * @param jwt the json web token
     */
    public async authenticate(domain: string, jwt: string): Promise<JWTPayload> {
        // Retrieve localAuthority to get the secret
        const localAuthority: LocalAuthority | undefined = await this.localAuthorityDao.findByCredentialAccessKey(domain);
        if (localAuthority === undefined) {
            this.logger.error("LocalAuthority not found");
            throw new AccessDeniedError("Access denied");
        }
        const jwtPayload: JWTPayload = (JWT.verify(jwt, (await localAuthority.getCredential()).getSecret()) as JWTPayload);
        // JWT library cannot convert id to number
        jwtPayload.id = Number(jwtPayload.id);

        return jwtPayload;
    }
}
