/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { AccessDeniedError } from "./error/AccessDeniedError";
import { Utils } from "./Utils";
import { ContextApp } from "../ContextApp";
import { User } from "../persistence/domain/User";
import { UserDao } from "../persistence/dao/UserDao";
import { JWTPayload } from "../security/JWTToken";
import { IllegalArgumentError } from "./error/IllegalArgumentError";
import { Config } from "../Config";
import { ClientControlManager } from "../security/ClientControlManager";
import { UserControlManager } from "../security/UserControlManager";
import { Request } from "express-serve-static-core";

/**
 * Check if user can access to resource
 * @param roles
 * @returns {(target:any, propertyKey:string, descriptor:PropertyDescriptor) => descriptor}
 * @constructor
 */
function UserControl(...roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;
        // TODO reimplement this method, wait new reflexion from expiration of JWT and refresh. And extract to a UserControlManager /!\
        // Add code before execute method
        descriptor.value = async function(...args: any[]) {
            this.logger.info("Begin authentication");

            // Get Request context
            const context = require("request-context");
            const request = context.get("request:req") as Request;
            const userDao: UserDao = ContextApp.getContainer().get("UserDao") as UserDao;

            // retrieve the authorization in header
            const authorizationRaw: string = request.headers.authorization;
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
            const domain: string = request.hostname.split(".")[0];

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
function ClientControl(...roles: string[]) {
    return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        descriptor.value = async function(...args: any[]) {
            // Get Request context
            const context = require("request-context");
            const request = context.get("request:req") as Request;
            
            // Retrieve all security needs elements
            const path: string = request.path.substring(Config.getAppBasePath().length);
            const timestamps: number = Number(request.get("x-timestamp"));
            const signature: string = request.get("signature");
            const method: string = request.method;

            // Try to authenticate client with provide information
            const clientRoles: string[] = await (ContextApp.getContainer().get("ClientControlManager") as ClientControlManager).authenticateClient(path, signature, new Map(Object.entries(request.query)), Number(timestamps), method);

            // Check roles for client
            for (const role of roles) {
                if (clientRoles.indexOf(role) === -1) {
                    this.logger.error("Client cannot access to this resource");
                    throw new AccessDeniedError("Access denied");
                }
            }

            return originalMethod.apply(this, args);
        };

        return descriptor;

    };
}

export { UserControl, ClientControl };
