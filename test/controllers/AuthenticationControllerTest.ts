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

import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import { UserAuthenticationQueryService } from "../../src/services/query/UserAuthenticationQueryService";
import { UserAuthenticationToken } from "../../src/controllers/rest/model/user/UserAuthenticationToken";
import { UserAuthenticationTokenDTO } from "../../src/services/query/dto/user/UserAuthenticationTokenDTO";
import { Labeled } from "../../src/common/Labeled";
import { AccessDeniedError } from "../../src/common/error/AccessDeniedError";
import { IllegalArgumentError } from "../../src/common/error/IllegalArgumentError";
import { UserTokenDTO } from "../../src/services/query/dto/user/UserTokenDTO";
import { UserToken } from "../../src/controllers/rest/model/user/UserToken";
import { Role } from "../../src/common/enum/Role";
import { ClientControlManager } from "../../src/security/ClientControlManager";

/**
 * All test for authentication service
 */
@suite
class AuthenticationControllerTest extends AbstractTestController {

    /**
     * Test function authenticate user
     */
    @test
    private async testAuthenticate(): Promise<void> {
        const path: string = "/api/authentications";
        const userAuthenticationQueryService: TypeMoq.IMock<UserAuthenticationQueryService> = ContextApp.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        const userToken: UserAuthenticationToken = new UserAuthenticationToken();
        userToken.email = "stark";
        userToken.password = "password";

        const userTokenDTOMock: UserTokenDTO = new UserTokenDTO();
        userTokenDTOMock.setToken("POST.MODERN.JUKEBOX");
        userTokenDTOMock.setEmail(userToken.email);
        userTokenDTOMock.setId(1);

        userAuthenticationQueryService.setup((instance) => instance.authenticate(TypeMoq.It.is((token: UserAuthenticationTokenDTO) => {
            let ret = token.getEmail() === userToken.email;
            ret = ret && token.getPassword() === userToken.password;
            ret = ret && token.getDomain() === "localhost";

            return ret;
        }))).returns(() => Promise.resolve(userTokenDTOMock));

        let opts = {
            method: "Post",
            uri: AbstractTestController.getBackend() + path,
            body: userToken,
            json: true
        };

        // Check with a standard call, parsing is different because use privates attributes
        let actual: UserToken = new UserToken();
        await Request(opts).then((data: Labeled) => {
            Object.assign(actual, data);
        });
        console.log(actual);
        Chai.assert.equal(actual.email, userToken.email, "Expected same lastName");
        Chai.assert.equal(actual.id, 1, "Expected same id");
        Chai.assert.equal(actual.token, "POST.MODERN.JUKEBOX", "Expected same token");
    }

    @test
    public async testAuthenticateError(): Promise<void> {
        const path: string = "/api/authentications";
        const userAuthenticationQueryService: TypeMoq.IMock<UserAuthenticationQueryService> = ContextApp.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        // Check throw exception (access denied)
        const userToken: UserAuthenticationToken = new UserAuthenticationToken();
        userToken.email = "stark";
        userToken.password = "password";

        const opts = {
            method: "Post",
            uri: AbstractTestController.getBackend() + path,
            body: userToken,
            json: true
        };

        userAuthenticationQueryService.setup((instance) => instance.authenticate(TypeMoq.It.is((token: UserAuthenticationTokenDTO) => {
            let ret = token.getEmail() === userToken.email;
            ret = ret && token.getPassword() === userToken.password;

            return ret;
        }))).throws(new AccessDeniedError("ERROR"));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        // Check throw exception (Illegal argument)
        userAuthenticationQueryService.setup((instance) => instance.authenticate(TypeMoq.It.is((token: UserAuthenticationTokenDTO) => {
            let ret = token.getEmail() === userToken.email;
            ret = ret && token.getPassword() === userToken.password;

            return ret;
        }))).throws(new IllegalArgumentError("ERROR"));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }
}
