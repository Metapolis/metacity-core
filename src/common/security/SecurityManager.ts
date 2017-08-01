
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../Utils";
import { CollectivityDao } from "../../persistence/dao/CollectivityDao";
import { JWTPayload } from "./JWTToken";
import { Collectivity } from "../../persistence/domain/Collectivity";
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
     * Collectivity data access object
     */
    @inject("CollectivityDao")
    private collectivityDao: CollectivityDao;

    /**
     * Authenticate user with JWT
     *
     * @param domain domain to determine the collectivity
     * @param jwt the json web token
     */
    public async authenticate(domain: string, jwt: string): Promise<JWTPayload> {
        // Retrieve collectivity to get the secret
        const collectivity: Collectivity = await this.collectivityDao.findById(domain);
        if (collectivity === undefined) {
            this.logger.error("Collectivity not found");
            throw new AccessDeniedError("Access denied");
        }
        const jwtPayload: JWTPayload = (JWT.verify(jwt, collectivity.getSecret()) as JWTPayload);
        // JWT library cannot convert id to number
        jwtPayload.id = Number(jwtPayload.id);

        return jwtPayload;
    }
}
