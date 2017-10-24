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
import {isNullOrUndefined} from "util";
import {IllegalArgumentError} from "../../src/common/error/IllegalArgumentError";
import { UserQueryService } from "../../src/services/query/UserQueryService";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { UserDTO } from "../../src/services/query/dto/user/UserDTO";
import { FindUserQuery } from "../../src/common/query/FindUserQuery";
import { ResultList } from "../../src/common/ResultList";
import { User } from "../../src/controllers/rest/model/user/User";

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

        const user: SaveUser = new SaveUser();
        user.lastName = "michel";
        user.password = "Champion";
        user.email = "john@cena";

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        userCommandService.setup((instance) => instance.createUser(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        let statusCode = HTTPStatusCodes.OK;
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

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit
            }
        };

        // Check no offset
        opts.qs.offset = null;
        let statusCode = HTTPStatusCodes.OK;
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
