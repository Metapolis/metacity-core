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
import { UserCommandService } from "../../src/services/command/UserCommandService";
import { SaveUserCommandDTO } from "../../src/services/command/dto/user/SaveUserCommandDTO";
import { SaveUser } from "../../src/controllers/rest/model/user/SaveUser";
import {} from "../../src/persistence/domain/Circle";
import {NumberIdentifier} from "../../src/controllers/rest/model/common/NumberIdentifier";
import {Labeled} from "../../src/common/Labeled";
import {IllegalArgumentError} from "../../src/common/error/IllegalArgumentError";
import { UserQueryService } from "../../src/services/query/UserQueryService";
import { UserDTO } from "../../src/services/query/dto/user/UserDTO";
import { FindUserQuery } from "../../src/common/query/FindUserQuery";
import { ResultList } from "../../src/common/ResultList";
import { User } from "../../src/controllers/rest/model/user/User";
import { Role } from "../../src/common/enum/Role";
import { ClientControlManager } from "../../src/security/ClientControlManager";

/**
 * All test for user creation
 */
@suite
export class UserControllerTest extends AbstractTestController {

    /**
     * Test function create user
     */
    @test
    public async testCreateUser(): Promise<void> {

        const path: string = "/api/users";
        const userCommandService: TypeMoq.IMock<UserCommandService> = (ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>);
        // Hello im a rigid linter
        const userIdentifier = 42;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        const user: SaveUser = new SaveUser();
        user.lastName = "michel";
        user.firstName = "Maison";
        user.email = "john@cena";
        user.avatarUrl = "Pour vendre des velux";
        user.password = "Monique";

        userCommandService.setup((instance: UserCommandService) => instance.createUser(TypeMoq.It.is((userDTO: SaveUserCommandDTO) => {
            let ret = userDTO.getLastName() === user.lastName;
            ret = ret && userDTO.getFirstName() === user.firstName;
            ret = ret && userDTO.getEmail() === user.email;
            ret = ret && userDTO.getAvatarUrl() === user.avatarUrl;
            ret = ret && userDTO.getPassword() === user.password;
            return ret;
        }))).returns(() => Promise.resolve(userIdentifier));

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        const actual: NumberIdentifier = new NumberIdentifier(0);
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);

        });

        console.log(actual);
        Chai.assert.equal(actual.identifier, userIdentifier, "Expected same identifier");

    }

    @test
    public async testCreateUserError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to create a circle
        const path: string = "/api/users";
        const userCommandService: TypeMoq.IMock<UserCommandService> = (ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>);
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        const user: SaveUser = new SaveUser();
        user.lastName = "michel";
        user.password = "Champion";
        user.email = "john@cena";

        let opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        userCommandService.setup((instance) => instance.createUser(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    @test
    private async testFindUsers(): Promise<void> {
        const path: string = "/api/users";
        const offset: number = 0;
        const limit: number = 20;
        const userQueryService: TypeMoq.IMock<UserQueryService> = (ContextApp.container.get("UserQueryServiceMock") as TypeMoq.IMock<UserQueryService>);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        const mockUsers: UserDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockUser: UserDTO = new UserDTO();
            mockUser.setId(i);
            mockUser.setFirstName("Tony" + i);
            mockUser.setLastName("Stark" + i);
            mockUser.setEmail("tony.stark" + i + "@stark.com");

            mockUsers.push(mockUser);
        }

        const mockQuery: FindUserQuery = new FindUserQuery();
        mockQuery.setLimit(limit);
        mockQuery.setOffset(offset);

        userQueryService.setup((instance) => instance.findUsers(TypeMoq.It.is((query: FindUserQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.isSet() === false;

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<UserDTO>(200, mockUsers)));

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit
            }
        };

        // Check with a standard call, no filter, pass
        let responseValue: string = "";
        await Request(opts).then((data: string) => {
            responseValue += data;
        });

        let actual: ResultList<User> = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertUser(actual.results[j], mockUsers[j]);
        }

        let optsFilter = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit,
                q: "1,tot;tony,ant"
            },
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1iYXlvdSIsImlkIjoiMSIsInJvbGVzIjpbXSwiaWF0IjoxNTAxNTEzMjIwfQ.GnTWMzQYkyJImEybLUi7G-mGniqVwruAqA9ewXhgYQ8"
            }
        };

        userQueryService.setup((instance) => instance.findUsers(TypeMoq.It.is((query: FindUserQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.isSet() === true;
            ret = ret && query.getQFilter().getMustParams().length === 2;
            ret = ret && query.getQFilter().getMustParams()[0] === "1";
            ret = ret && query.getQFilter().getMustParams()[1] === "tot";
            ret = ret && query.getQFilter().getShouldParams().length === 2;
            ret = ret && query.getQFilter().getShouldParams()[0] === "tony";
            ret = ret && query.getQFilter().getShouldParams()[1] === "ant";

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<UserDTO>(200, mockUsers)));

        // Check with a standard call, no filter, pass
        responseValue = "";
        await Request(optsFilter).then((data: string) => {
            responseValue += data;
        });

        actual = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertUser(actual.results[j], mockUsers[j]);
        }
    }

    @test
    public async testFindUserError(): Promise<void> {
        const path: string = "/api/users";
        const offset: number = 0;
        const limit: number = 20;
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit
            }
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });
        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        clientControlManageMock.reset();
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER]));

        // Check no offset
        opts.qs.offset = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });
        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative offset
        opts.qs.offset = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check null limit
        opts.qs.offset = offset;
        opts.qs.limit = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative limit
        opts.qs.limit = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    private assertUser(actual: User, expected: UserDTO): void {
        Chai.assert.isTrue(actual.id === expected.getId());
        Chai.assert.isTrue(actual.firstName === expected.getFirstName());
        Chai.assert.isTrue(actual.lastName === expected.getLastName());
        Chai.assert.isTrue(actual.email === expected.getEmail());
    }
}
