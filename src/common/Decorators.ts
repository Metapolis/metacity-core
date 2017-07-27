import { RequestAccessor } from "../RequestAccessor";
import { AccessDeniedError } from "./error/AccessDeniedError";
import { Utils } from "./Utils";
import * as JWT from "jsonwebtoken";
import { Collectivity } from "../persistence/domain/Collectivity";
import { ContextApp } from "../ContextApp";
import { CollectivityDao } from "../persistence/dao/CollectivityDao";
import { User } from "../persistence/domain/User";
import { UserDao } from "../persistence/dao/UserDao";
import { JWTPayload } from "./JWTToken";
/**
 * Check if user can access to resource
 * @param roles
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor) => descriptor}
 * @constructor
 */
function Secured(roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            const domain: string = RequestAccessor.getRequest().hostname.split(".")[0];
            const collectivityDao: CollectivityDao = ContextApp.getContainer().get("CollectivityDao") as CollectivityDao;
            const userDao: UserDao = ContextApp.getContainer().get("UserDao") as UserDao;

            const collectivity: Collectivity = await collectivityDao.findById(domain);
            if (collectivity === undefined) {
                this.logger.error("Collectivity not found");
                throw new AccessDeniedError("Access denied");
            }

            const authorizationRaw: string = RequestAccessor.getRequest().headers.authorization;
            if (authorizationRaw === undefined) {
                this.logger.error("Token not found");
                throw new AccessDeniedError("No token found");
            }

            const authorizationArray: string[] = authorizationRaw.split(" ");
            Utils.checkArgument(authorizationArray.length > 1, "Malformed authentication method");

            const bearer: string = authorizationArray[0];
            if (bearer !== "Bearer") {
                this.logger.error("No bearer found in authorization field");
                throw new AccessDeniedError("Bad authentication method");
            }

            const jwtEncoded = authorizationArray[1];
            Utils.checkArgument(!Utils.isNullOrEmpty(jwtEncoded), "Malformed token");

            const authorizationElement: JWTPayload = (JWT.verify(jwtEncoded, collectivity.getSecret()) as JWTPayload);

            const user: User = await userDao.findById(authorizationElement.id);

            if (user === undefined) {
                this.logger.error("No user found");
                throw new AccessDeniedError("Access denied");
            }

            let userRoles: string[] = [];
            for (const circle of await user.getCircles()) {
                userRoles = userRoles.concat(circle.getRoles());
            }

            for (const role of roles) {
                if (userRoles.indexOf(role) === -1) {
                    this.logger.error("User cannot access to this resource");
                    throw new AccessDeniedError("Access denied");
                }
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;

    };
}

export { Secured };
