import { RequestAccessor } from "../RequestAccessor";
import { AccessDeniedError } from "./error/AccessDeniedError";
import { Utils } from "./Utils";
import { ContextApp } from "../ContextApp";
import { User } from "../persistence/domain/User";
import { UserDao } from "../persistence/dao/UserDao";
import { JWTPayload } from "./security/JWTToken";
import { IllegalArgumentError } from "./error/IllegalArgumentError";
import { Config } from "../Config";
import { ClientControlManager } from "./security/impl/ClientControlManager";
import { UserControlManager } from "./security/impl/UserControlManager";
import { timestamp } from "rxjs/operator/timestamp";

/**
 * Check if user can access to resource
 * @param roles
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor) => descriptor}
 * @constructor
 */
function UserControl(roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        // Add code before execute method
        descriptor.value = async function(...args: any[]) {
            this.logger.info("Begin authentication");
            const userDao: UserDao = ContextApp.getContainer().get("UserDao") as UserDao;

            // retrieve the authorization in header
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
            const authorizationElement: JWTPayload = await (ContextApp.getContainer().get("UserControlManager") as UserControlManager).authenticate(domain, jwtEncoded);

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

/**
 * Check if client can access to resource
 * @param roles
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor) => descriptor}
 * @constructor
 */
function ClientControl(roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        // Add code before execute method
        descriptor.value = async function(...args: any[]) {
            // TODO check client control (signature)
            const path = RequestAccessor.getRequest().path.substring(Config.getAppBasePath().length);
            const timestamps = RequestAccessor.getRequest().get("x-timestamp");
            await (ContextApp.getContainer().get("ClientControlManager") as ClientControlManager).authenticateClient(path, new Map(Object.entries(RequestAccessor.getRequest().query)), Number(timestamps));
            return originalMethod.apply(this, args);
        };

        return descriptor;

    };
}

export { UserControl, ClientControl };
