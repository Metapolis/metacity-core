import { RequestAccessor } from "../RequestAccessor";
import { AccessDeniedError } from "./error/AccessDeniedError";
import { Utils } from "./Utils";
import { ContextApp } from "../ContextApp";
import { User } from "../persistence/domain/User";
import { UserDao } from "../persistence/dao/UserDao";
import { JWTPayload } from "./security/JWTToken";
import { SecurityManager } from "./security/SecurityManager";
import { IllegalArgumentError } from "./error/IllegalArgumentError";

/**
 * Check if user can access to resource
 * @param roles
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor) => descriptor}
 * @constructor
 */
function Secured(roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        // Add code before execute method
        descriptor.value = async function(...args: any[]) {
            this.logger.info("Begin authentication");
            const userDao: UserDao = ContextApp.getContainer().get("UserDao") as UserDao;

            // retrive the authorization in header
            const authorizationRaw: string = RequestAccessor.getRequest().headers.authorization;
            if (authorizationRaw === undefined) {
                this.logger.error("Token not found");
                throw new IllegalArgumentError("No token found");
            }

            // Split authorization value to retrieve the jwt value
            const authorizationArray: string[] = authorizationRaw.split(" ");
            Utils.checkArgument(authorizationArray.length > 1, "Malformed authentication method");

            const bearer: string = authorizationArray[0];
            if (bearer !== "Bearer") {
                this.logger.error("No bearer found in authorization field");
                throw new IllegalArgumentError("Bad authentication method");
            }

            const jwtEncoded = authorizationArray[1];
            Utils.checkArgument(!Utils.isNullOrEmpty(jwtEncoded), "Malformed token");

            // Retrieve the sub domain who is the identifier of localAuthority
            const domain: string = RequestAccessor.getRequest().hostname.split(".")[0];

            // Retrieve the payload value
            const authorizationElement: JWTPayload = await (ContextApp.getContainer().get("SecurityManager") as SecurityManager).authenticate(domain, jwtEncoded);

            const user: User = await userDao.findById(authorizationElement.id);

            if (user === undefined) {
                this.logger.error("No user found");
                throw new AccessDeniedError("Access denied");
            }

            const userRoles: string[] = await user.getRoles();
            for (const role of roles) {
                if (userRoles.indexOf(role) === -1) {
                    this.logger.error("User cannot access to this resource");
                    throw new AccessDeniedError("Access denied");
                }
            }
            this.logger.info("Authentication succeed");

            return originalMethod.apply(this, args);
        };

        return descriptor;

    };
}

export { Secured };
