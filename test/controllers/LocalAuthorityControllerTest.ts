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
import {} from "../../src/persistence/domain/Circle";
import { CircleCommandService } from "../../src/services/command/CircleCommandService";
import { SaveCircleCommandDTO } from "../../src/services/command/dto/circle/SaveCircleCommandDTO";
import { NumberIdentifier } from "../../src/controllers/rest/model/common/NumberIdentifier";
import { SaveCircle } from "../../src/controllers/rest/model/circle/SaveCircle";
import { Labeled } from "../../src/common/Labeled";
import { IllegalArgumentError } from "../../src/common/error/IllegalArgumentError";
import { UpdateCircleCommandDTO } from "../../src/services/command/dto/circle/UpdateCircleCommandDTO";
import { CircleQueryService } from "../../src/services/query/CircleQueryService";
import { CircleDetails } from "../../src/controllers/rest/model/circle/CircleDetails";
import { Role } from "../../src/common/enum/Role";
import { CircleDTO } from "../../src/services/query/dto/circle/CircleDTO";
import { UserDTO } from "../../src/services/query/dto/circle/UserDTO";
import { TestUtils } from "../common/TestUtils";
import { ResultList } from "../../src/common/ResultList";
import { CircleSummary } from "../../src/controllers/rest/model/circle/CircleSummary";
import { FindCircleQuery } from "../../src/common/query/FindCircleQuery";
import { LocalAuthorityQueryService } from "../../src/services/query/LocalAuthorityQueryService";

/**
 * All test for circle creation
 */
@suite
export class LocalAuthorityControllerTest extends AbstractTestController {
    private static circleCommandService: TypeMoq.IMock<CircleCommandService>;
    private static circleQueryService: TypeMoq.IMock<CircleQueryService>;

    public static async before(): Promise<void> {
        AbstractTestController.before();
        LocalAuthorityControllerTest.circleCommandService = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        LocalAuthorityControllerTest.circleQueryService = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
    }

    /**
     * Test function create localAuthority circle
     */
    @test
    public async testCreateLocalAuthorityCircle(): Promise<void> {

        const path: string = "/api/local-authorities/{localauthorityid}/circles";
        const localAuthorityId: number = 5;
        // Hello im a rigid linter
        const circleIdentifier = 42;
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);

        localAuthorityQueryService.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];
        circle.defaultCircle = true;

        LocalAuthorityControllerTest.circleCommandService.setup((instance: CircleCommandService) => instance.createCircle(TypeMoq.It.is((localAuthorityCircle: SaveCircleCommandDTO) => {
            let ret = localAuthorityCircle.getRoles().length === circle.roles.length;
            for (let i = 0; i < circle.roles.length; i++) {
                ret = ret && localAuthorityCircle.getRoles()[i] === circle.roles[i];
            }
            ret = ret && localAuthorityCircle.getName() === circle.name;
            ret = ret && localAuthorityCircle.isDefaultCircle() === circle.defaultCircle;
            ret = ret && localAuthorityCircle.getLocalAuthorityId() === localAuthorityId;
            return ret;
        }))).returns(() => Promise.resolve(circleIdentifier));

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            body: circle,
            json: true
        };

        const actual: NumberIdentifier = new NumberIdentifier(0);
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);
        });

        Chai.assert.equal(actual.identifier, circleIdentifier, "Expected same identifier");
    }

    @test
    public async testCreateLocalAuthorityCircleError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to create a circle
        const path: string = "/api/local-authorities/1/circles";
        const path404: string = "/api/local-authorities/2/circles";
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);

        localAuthorityQueryService.setup((instance) => instance.isExists(1)).returns(() => Promise.resolve(true));
        localAuthorityQueryService.setup((instance) => instance.isExists(2)).returns(() => Promise.resolve(false));

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path404,
            body: circle,
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        opts.uri = AbstractTestController.getBackend() + path;
        LocalAuthorityControllerTest.circleCommandService.setup(
            (instance) => instance.createCircle(TypeMoq.It.isAny())
        ).throws(new IllegalArgumentError("ERROR"));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    @test
    public async testUpdateLocalAuthorityCircle(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const localAuthorityId: number = 12;
        const circleIdentifier = 42;

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];
        circle.defaultCircle = true;

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
        };

        await Request(opts);

        LocalAuthorityControllerTest.circleCommandService.verify((instance: CircleCommandService) => instance.updateCircle(TypeMoq.It.is((localAuthorityCircle: UpdateCircleCommandDTO) => {
            let ret = localAuthorityCircle.getRoles().length === circle.roles.length;
            for (let i = 0; i < circle.roles.length; i++) {
                ret = ret && localAuthorityCircle.getRoles()[i] === circle.roles[i];
            }
            ret = ret && localAuthorityCircle.getName() === circle.name;
            ret = ret && localAuthorityCircle.isDefaultCircle() === circle.defaultCircle;
            ret = ret && localAuthorityCircle.getLocalAuthorityId() === localAuthorityId;
            ret = ret && localAuthorityCircle.getId() === circleIdentifier;
            return ret;
        })), TypeMoq.Times.exactly(1));

    }

    @test
    public async testUpdateLocalAuthorityCircleError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 12;

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
        };

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(false));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        LocalAuthorityControllerTest.circleCommandService.setup((instance) => instance.updateCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    @test
    public async testGetLocalAuthorityCircleDetails(): Promise<void> {
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        const mockUsers: UserDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockUser: UserDTO = new UserDTO();
            mockUser.setId(i);
            mockUser.setFirstName(TestUtils.randomString(8));
            mockUser.setLastName(TestUtils.randomString(8));
            mockUsers.push(mockUser);
        }

        const circleDTOMock: CircleDTO = new CircleDTO();
        circleDTOMock.setId(circleIdentifier);
        circleDTOMock.setRoles([Role.READ_ALL]);
        circleDTOMock.setName("michel");
        circleDTOMock.setDefaultCircle(true);
        circleDTOMock.setMembers(mockUsers);

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.getCircle(circleIdentifier)).returns(() => Promise.resolve(circleDTOMock));

        const actual: CircleDetails = new CircleDetails();
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);
        });
        Chai.assert.equal(actual.id, circleDTOMock.getId(), "Expected same id");
        Chai.assert.equal(actual.name, circleDTOMock.getName(), "Expected same name");
        Chai.assert.deepEqual(actual.roles, circleDTOMock.getRoles(), "Expected same role");
        Chai.assert.equal(actual.defaultCircle, circleDTOMock.isDefaultCircle(), "Expected same circle default");
        Chai.assert.equal(actual.members.length, circleDTOMock.getMembers().length);
        for (let i = 0; i < circleDTOMock.getMembers().length; i++) {
            Chai.assert.equal(actual.members[i].id, circleDTOMock.getMembers()[i].getId());
            Chai.assert.equal(actual.members[i].firstName, circleDTOMock.getMembers()[i].getFirstName());
            Chai.assert.equal(actual.members[i].lastName, circleDTOMock.getMembers()[i].getLastName());
        }
    }

    @test
    public async testGetLocalAuthorityCircleDetailsError(): Promise<void> {
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", "toto").replace("{circleid}", String(circleIdentifier)),
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.getCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

    }

    @test
    public async testFindLocalAuthorityCircles(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/circles?limit={limit}&offset={offset}";
        const resultTotal: number = 72;
        const localAuthorityId: number = 1;
        const limit: number = 10;
        const offset: number = 0;
        const circlesDTOMock: CircleDTO[] = [];
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);

        for (let i = 0; i < resultTotal; i++) {
            const circleDTOMock: CircleDTO = new CircleDTO();
            circleDTOMock.setId(i);
            circleDTOMock.setName(TestUtils.randomString(8));
            circleDTOMock.setDefaultCircle(TestUtils.randomInt(2) === 1);
            circlesDTOMock.push(circleDTOMock);
        }
        const circlesResultListMock: ResultList<CircleDTO> = new ResultList<CircleDTO>(resultTotal, circlesDTOMock);

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{limit}", String(limit)).replace("{offset}", String(offset)),
            json: true
        };

        const mockQuery: FindCircleQuery = new FindCircleQuery();
        mockQuery.setLocalAuthorityId(localAuthorityId);
        mockQuery.setLimit(limit);
        mockQuery.setOffset(offset);

        LocalAuthorityControllerTest.circleQueryService.
            setup((instance) => instance.findCircles(mockQuery)).
            returns(() => Promise.resolve(circlesResultListMock));
        localAuthorityQueryService.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));
        localAuthorityQueryService.setup((instance) => instance.isExists(localAuthorityId + 1)).returns(() => Promise.resolve(false));

        const actual: CircleSummary[] = [];
        await Request(opts).then((data: ResultList<CircleSummary>) => {
            Object.assign(actual, data.results);
        });
        for (let i = 0; i < resultTotal; i++) {
            Chai.assert.equal(actual[i].id, circlesDTOMock[i].getId(), "Expected same id");
            Chai.assert.equal(actual[i].name, circlesDTOMock[i].getName(), "Expected same name");
            Chai.assert.equal(actual[i].defaultCircle, circlesDTOMock[i].isDefaultCircle(), "Expected same circle default");
        }

        // Check for local authority does not exist
        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1)).replace("{limit}", String(limit)).replace("{offset}", String(offset));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND);
    }

    @test
    public async testDeleteLocalAuthorityCircle(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        const mockUsers: UserDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockUser: UserDTO = new UserDTO();
            mockUser.setId(i);
            mockUser.setFirstName(TestUtils.randomString(8));
            mockUser.setLastName(TestUtils.randomString(8));
            mockUsers.push(mockUser);
        }

        const circleDTOMock: CircleDTO = new CircleDTO();
        circleDTOMock.setId(circleIdentifier);
        circleDTOMock.setRoles([Role.READ_ALL]);
        circleDTOMock.setName("michel");
        circleDTOMock.setDefaultCircle(true);
        circleDTOMock.setMembers(mockUsers);

        const opts = {
            method: "DELETE",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));

        const actual: CircleDetails = new CircleDetails();
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);
        });

        LocalAuthorityControllerTest.circleCommandService.verify((instance) => instance.deleteCircle(circleIdentifier), TypeMoq.Times.exactly(1));
    }

    @test
    public async testDeleteLocalAuthorityCircleError(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 23;

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(false));

        const opts = {
            method: "DELETE",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");
        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));
        LocalAuthorityControllerTest.circleCommandService.setup((instance) => instance.deleteCircle(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }
}
