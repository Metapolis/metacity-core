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
import { ContextApp } from "../ContextApp";
import { Config } from "../Config";
import { Request } from "express-serve-static-core";
import { ClientControlManager } from "./security/ClientControlManager";

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

export { ClientControl };
