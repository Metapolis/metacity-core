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
import { ClientControlManager } from "../../src/security/ClientControlManager";
import { SaveLocalAuthority } from "../../src/controllers/rest/model/local-authority/SaveLocalAuthority";
import { UIConfig } from "../../src/common/model/UIConfig";
import { Location } from "../../src/common/model/Location";
import { LocalAuthorityCommandService } from "../../src/services/command/LocalAuthorityCommandService";
import { UpdateLocalAuthorityCommandDTO } from "../../src/services/command/dto/local-authority/UpdateLocalAuthorityCommandDTO";
import { LocalAuthorityDTO } from "../../src/services/query/dto/local-authority/LocalAuthorityDTO";
import { LocalAuthorityDetails } from "../../src/controllers/rest/model/local-authority/LocalAuthorityDetails";
import { DataSetDTO } from "../../src/services/query/dto/data-set/DataSetDTO";
import { FindDataSetQuery } from "../../src/common/query/FindDataSetQuery";
import { DataSetSummary } from "../../src/controllers/rest/model/data-set/DataSetSummary";
import { DataSetQueryService } from "../../src/services/query/DataSetQueryService";
import { BooleanValue } from "../../src/controllers/rest/model/common/BooleanValue";
import { DataSetCommandService } from "../../src/services/command/DataSetCommandService";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { HttpLocalAuthorityProvider } from "../../src/security/HttpLocalAuthorityProvider";

/**
 * All test for circle creation
 */
@suite
export class LocalAuthorityControllerTest extends AbstractTestController {
    private static circleCommandService: TypeMoq.IMock<CircleCommandService>;
    private static circleQueryService: TypeMoq.IMock<CircleQueryService>;

    public static async before(): Promise<void> {
        await AbstractTestController.before();
        LocalAuthorityControllerTest.circleCommandService = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        LocalAuthorityControllerTest.circleQueryService = (ContextApp.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>);
    }

    public before(): void {
        const localAuthorityConnected: LocalAuthority = new LocalAuthority();
        localAuthorityConnected.setId(12);
        (ContextApp.container.get("HttpLocalAuthorityProviderMock") as TypeMoq.IMock<HttpLocalAuthorityProvider>).setup((instance) => instance.get()).returns(() => localAuthorityConnected);
    }

    /**
     * Test function create localAuthority circle
     */
    @test
    public async testCreateLocalAuthorityCircle(): Promise<void> {

        const path: string = "/api/local-authorities/{localauthorityid}/circles";
        const localAuthorityId: number = 12;
        // Hello im a rigid linter
        const circleIdentifier = 42;
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

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
        const path: string = "/api/local-authorities/12/circles";
        const path403: string = "/api/local-authorities/13/circles";
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        let opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: circle,
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        opts.uri = AbstractTestController.getBackend() + path403;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts.uri = AbstractTestController.getBackend() + path;
        localAuthorityQueryService.setup((instance) => instance.isExists(12)).returns(() => Promise.resolve(false));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");
        localAuthorityQueryService.reset();
        localAuthorityQueryService.setup((instance) => instance.isExists(12)).returns(() => Promise.resolve(true));

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
    public async testUpdateLocalAuthority(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}";
        const localAuthorityId: number = 12;
        const localAuthorityQueryServiceMock: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const localAuthorityCommandServiceMock: TypeMoq.IMock<LocalAuthorityCommandService> = (ContextApp.container.get("LocalAuthorityCommandServiceMock") as TypeMoq.IMock<LocalAuthorityCommandService>);

        const localAuthority: SaveLocalAuthority = new SaveLocalAuthority();
        localAuthority.name = "michel";
        localAuthority.uiConfig = new UIConfig();
        localAuthority.uiConfig.logo = "Logo de ouf !";
        localAuthority.uiConfig.primaryColor = "#AAAAAA";
        localAuthority.uiConfig.secondaryColor = "#BBBBBB";
        localAuthority.uiConfig.location = new Location();
        localAuthority.uiConfig.location.latitude = 2.45879632;
        localAuthority.uiConfig.location.longitude = 1.000012587;
        localAuthority.uiConfig.location.zoomFactor = 2;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_LOCAL_AUTHORITY]));

        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            body: localAuthority,
            json: true
        };

        await Request(opts);

        localAuthorityCommandServiceMock.verify((instance: LocalAuthorityCommandService) => instance.updateLocalAuthority(TypeMoq.It.is((localAuthorityLocalAuthority: UpdateLocalAuthorityCommandDTO) => {
            let ret = localAuthorityLocalAuthority.getUIConfig().secondaryColor === localAuthority.uiConfig.secondaryColor;
            ret = ret && localAuthorityLocalAuthority.getUIConfig().primaryColor === localAuthority.uiConfig.primaryColor;
            ret = ret && localAuthorityLocalAuthority.getUIConfig().logo === localAuthority.uiConfig.logo;
            ret = ret && localAuthorityLocalAuthority.getUIConfig().location.zoomFactor === localAuthority.uiConfig.location.zoomFactor;
            ret = ret && localAuthorityLocalAuthority.getUIConfig().location.longitude === localAuthority.uiConfig.location.longitude;
            ret = ret && localAuthorityLocalAuthority.getUIConfig().location.latitude === localAuthority.uiConfig.location.latitude;
            ret = ret && localAuthorityLocalAuthority.getName() === localAuthority.name;
            ret = ret && localAuthorityLocalAuthority.getId() === localAuthorityId;
            return ret;
        })), TypeMoq.Times.exactly(1));

    }

    @test
    public async testUpdateLocalAuthorityError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to update a localAuthority
        const path: string = "/api/local-authorities/{localauthorityid}";
        const localAuthorityId: number = 12;
        const localAuthorityCommandServiceMock: TypeMoq.IMock<LocalAuthorityCommandService> = (ContextApp.container.get("LocalAuthorityCommandServiceMock") as TypeMoq.IMock<LocalAuthorityCommandService>);
        const localAuthorityQueryServiceMock: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const localAuthority: SaveLocalAuthority = new SaveLocalAuthority();
        localAuthority.name = "michel";
        localAuthority.uiConfig = new UIConfig();
        localAuthority.uiConfig.logo = "Logo de ouf !";
        localAuthority.uiConfig.primaryColor = "#AAAAAA";
        localAuthority.uiConfig.secondaryColor = "#BBBBBB";
        localAuthority.uiConfig.location = new Location();
        localAuthority.uiConfig.location.latitude = 2.45879632;
        localAuthority.uiConfig.location.longitude = 1.000012587;
        localAuthority.uiConfig.location.zoomFactor = 2;

        let opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            body: localAuthority,
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_LOCAL_AUTHORITY]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            body: localAuthority,
            json: true
        };

        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(false));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        localAuthorityCommandServiceMock.setup((instance) => instance.updateLocalAuthority(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));
        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    @test
    public async testGetLocalAuthority(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}";
        const localAuthorityId: number = 12;
        const localAuthorityQueryServiceMock: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);

        const localAuthorityDTO: LocalAuthorityDTO = new LocalAuthorityDTO();
        localAuthorityDTO.setName("michel");
        localAuthorityDTO.setId(12);
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.logo = "Logo de ouf !";
        uiConfig.primaryColor = "#AAAAAA";
        uiConfig.secondaryColor = "#BBBBBB";
        uiConfig.location = new Location();
        uiConfig.location.latitude = 2.45879632;
        uiConfig.location.longitude = 1.000012587;
        uiConfig.location.zoomFactor = 2;
        localAuthorityDTO.setUIConfig(uiConfig);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_LOCAL_AUTHORITY]));

        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));
        localAuthorityQueryServiceMock.setup((instance) => instance.getLocalAuthority(localAuthorityId)).returns(() => Promise.resolve(localAuthorityDTO));

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            json: true
        };

        const actual: LocalAuthorityDetails = new LocalAuthorityDetails();
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);
        });

        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().secondaryColor === actual.uiConfig.secondaryColor);
        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().primaryColor === actual.uiConfig.primaryColor);
        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().logo === actual.uiConfig.logo);
        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().location.zoomFactor === actual.uiConfig.location.zoomFactor);
        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().location.longitude === actual.uiConfig.location.longitude);
        Chai.assert.isTrue(localAuthorityDTO.getUIConfig().location.latitude === actual.uiConfig.location.latitude);
        Chai.assert.isTrue(localAuthorityDTO.getName() === actual.name);
        Chai.assert.isTrue(localAuthorityDTO.getId() === actual.id);
    }

    @test
    public async testGetLocalAuthorityError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to update a localAuthority
        const path: string = "/api/local-authorities/{localauthorityid}";
        const localAuthorityId: number = 12;
        const localAuthorityQueryServiceMock: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const localAuthority: SaveLocalAuthority = new SaveLocalAuthority();
        localAuthority.name = "michel";
        localAuthority.uiConfig = new UIConfig();
        localAuthority.uiConfig.logo = "Logo de ouf !";
        localAuthority.uiConfig.primaryColor = "#AAAAAA";
        localAuthority.uiConfig.secondaryColor = "#BBBBBB";
        localAuthority.uiConfig.location = new Location();
        localAuthority.uiConfig.location.latitude = 2.45879632;
        localAuthority.uiConfig.location.longitude = 1.000012587;
        localAuthority.uiConfig.location.zoomFactor = 2;

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_LOCAL_AUTHORITY]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)),
            json: true
        };

        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(false));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        localAuthorityQueryServiceMock.setup((instance) => instance.getLocalAuthority(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));
        localAuthorityQueryServiceMock.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));

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
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

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
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const circle: SaveCircle = new SaveCircle();
        circle.name = "michel";
        circle.roles = ["Champion"];

        let opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1)).replace("{circleid}", String(circleIdentifier));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            body: circle,
            json: true
        };

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(false));

        statusCode = HTTPStatusCodes.OK;
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
    public async testUpdateLocalAuthorityDataSetRestricted(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/data-sets/{datasetid}/restricted";
        const localAuthorityId: number = 12;
        const dataSetIdentifier = 42;
        const dataSetQueryServiceMock: TypeMoq.IMock<DataSetQueryService> = (ContextApp.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>);
        const dataSetCommandServiceMock: TypeMoq.IMock<DataSetCommandService> = (ContextApp.container.get("DataSetCommandServiceMock") as TypeMoq.IMock<DataSetCommandService>);

        const restrictedValue: BooleanValue = new BooleanValue();
        restrictedValue.value = true;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_DATA_SET]));

        dataSetQueryServiceMock.setup((instance) => instance.isOwnedByLocalAuthority(dataSetIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));

        const opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{datasetid}", String(dataSetIdentifier)),
            body: restrictedValue,
            json: true
        };

        await Request(opts);

        dataSetCommandServiceMock.verify((instance: DataSetCommandService) => instance.updateRestrictedField(dataSetIdentifier, true), TypeMoq.Times.exactly(1));

    }

    @test
    public async testUpdateLocalAuthorityDataSetErrorRestricted(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to update a dataSet
        const path: string = "/api/local-authorities/{localauthorityid}/data-sets/{datasetid}/restricted";
        const dataSetIdentifier = 42;
        const localAuthorityId: number = 12;
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        const dataSetQueryServiceMock: TypeMoq.IMock<DataSetQueryService> = (ContextApp.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>);
        const dataSetCommandServiceMock: TypeMoq.IMock<DataSetCommandService> = (ContextApp.container.get("DataSetCommandServiceMock") as TypeMoq.IMock<DataSetCommandService>);

        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const restrictedValue: BooleanValue = new BooleanValue();
        restrictedValue.value = true;

        let opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{datasetid}", String(dataSetIdentifier)),
            body: restrictedValue,
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_DATA_SET]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1)).replace("{datasetid}", String(dataSetIdentifier));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts = {
            method: "PUT",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{datasetid}", String(dataSetIdentifier)),
            body: restrictedValue,
            json: true
        };

        dataSetQueryServiceMock.setup((instance) => instance.isOwnedByLocalAuthority(dataSetIdentifier, localAuthorityId)).returns(() => Promise.resolve(false));

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        dataSetCommandServiceMock.setup((instance) => instance.updateRestrictedField(TypeMoq.It.isAny(), TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));
        dataSetQueryServiceMock.setup((instance) => instance.isOwnedByLocalAuthority(dataSetIdentifier, localAuthorityId)).returns(() => Promise.resolve(true));

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
        const localAuthorityId: number = 12;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

        const mockUsers: UserDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockUser: UserDTO = new UserDTO();
            mockUser.setId(i);
            mockUser.setFirstName(TestUtils.randomString(8));
            mockUser.setLastName(TestUtils.randomString(8));
            mockUser.setEmail(TestUtils.randomString(8));

            mockUsers.push(mockUser);
        }

        const circleDTOMock: CircleDTO = new CircleDTO();
        circleDTOMock.setId(circleIdentifier);
        circleDTOMock.setRoles([Role.MANAGE_CIRCLE]);
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
            Chai.assert.equal(actual.members[i].email, circleDTOMock.getMembers()[i].getEmail());
        }
    }

    @test
    public async testGetLocalAuthorityCircleDetailsError(): Promise<void> {
        // 403 not enough rights => role is not high enough to update a circle
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 12;
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", "toto").replace("{circleid}", String(circleIdentifier)),
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1)).replace("{circleid}", String(circleIdentifier));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");


        opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };

        statusCode = HTTPStatusCodes.OK;
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
    public async testFindLocalAuthorityDataSets(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/data-sets?limit={limit}&offset={offset}";
        const resultTotal: number = 72;
        const localAuthorityId: number = 12;
        const limit: number = 10;
        const offset: number = 0;
        const dataSetsDTOMock: DataSetDTO[] = [];
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const dataSetQueryService: TypeMoq.IMock<DataSetQueryService> = (ContextApp.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_DATA_SET]));

        for (let i = 0; i < resultTotal; i++) {
            const dataSetDTOMock: DataSetDTO = new DataSetDTO();
            dataSetDTOMock.setId(i);
            dataSetDTOMock.setName(TestUtils.randomString(8));
            dataSetDTOMock.setRestricted(TestUtils.randomInt(2) === 1);
            dataSetsDTOMock.push(dataSetDTOMock);
        }
        const dataSetsResultListMock: ResultList<DataSetDTO> = new ResultList<DataSetDTO>(resultTotal, dataSetsDTOMock);

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{limit}", String(limit)).replace("{offset}", String(offset)),
            json: true
        };

        const mockQuery: FindDataSetQuery = new FindDataSetQuery();
        mockQuery.setLocalAuthorityId(localAuthorityId);
        mockQuery.setLimit(limit);
        mockQuery.setOffset(offset);

        dataSetQueryService.setup((instance) => instance.findDataSets(mockQuery)).returns(() => Promise.resolve(dataSetsResultListMock));
        localAuthorityQueryService.setup((instance) => instance.isExists(localAuthorityId)).returns(() => Promise.resolve(true));
        localAuthorityQueryService.setup((instance) => instance.isExists(localAuthorityId + 1)).returns(() => Promise.resolve(false));

        const actual: DataSetSummary[] = [];
        await Request(opts).then((data: ResultList<DataSetSummary>) => {
            Object.assign(actual, data.results);
        });
        for (let i = 0; i < resultTotal; i++) {
            Chai.assert.equal(actual[i].id, dataSetsDTOMock[i].getId(), "Expected same id");
            Chai.assert.equal(actual[i].name, dataSetsDTOMock[i].getName(), "Expected same name");
            Chai.assert.equal(actual[i].description, dataSetsDTOMock[i].getDescription(), "Expected same description");
            Chai.assert.equal(actual[i].restricted, dataSetsDTOMock[i].isRestricted(), "Expected same restricted value");
        }
    }

    @test
    public async testFindLocalAuthorityDataSetsError(): Promise<void> {
        const path: string = "/api/local-authorities/12/data-sets";
        const path403: string = "/api/local-authorities/13/data-sets";
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        const dataSetQueryService: TypeMoq.IMock<DataSetQueryService> = (ContextApp.container.get("DataSetQueryServiceMock") as TypeMoq.IMock<DataSetQueryService>);

        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).reset();
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.MANAGE_DATA_SET]));

        opts.uri = AbstractTestController.getBackend() + path403;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts.uri = AbstractTestController.getBackend() + path;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expect a 404");

        localAuthorityQueryService.setup((instance) => instance.isExists(12)).returns(() => Promise.resolve(true));
        dataSetQueryService.setup((instance) => instance.findDataSets(TypeMoq.It.isAny())).throws(new IllegalArgumentError());

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
        const localAuthorityId: number = 12;
        const limit: number = 10;
        const offset: number = 0;
        const circlesDTOMock: CircleDTO[] = [];
        const localAuthorityQueryService: TypeMoq.IMock<LocalAuthorityQueryService> = (ContextApp.container.get("LocalAuthorityQueryServiceMock") as TypeMoq.IMock<LocalAuthorityQueryService>);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

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
    }

    @test
    public async testFindLocalAuthorityCirclesError(): Promise<void> {
        const path: string = "/api/local-authorities/12/circles";
        const path403: string = "/api/local-authorities/13/circles";
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        const opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            json: true
        };

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).reset();
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.MANAGE_CIRCLE]));

        opts.uri = AbstractTestController.getBackend() + path403;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        opts.uri = AbstractTestController.getBackend() + path;

        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.NOT_FOUND, "Expected a 404");
    }

    @test
    public async testDeleteLocalAuthorityCircle(): Promise<void> {
        const path: string = "/api/local-authorities/{localauthorityid}/circles/{circleid}";
        const circleIdentifier = 42;
        const localAuthorityId: number = 12;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE, Role.MANAGE_CIRCLE]));

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
        circleDTOMock.setRoles([Role.MANAGE_CIRCLE]);
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
        const localAuthorityId: number = 12;
        const clientControlManageMock: TypeMoq.IMock<ClientControlManager> = (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>);
        clientControlManageMock.setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET]));

        let opts = {
            method: "DELETE",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
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
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_CIRCLE]));

        opts.uri = AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId + 1)).replace("{circleid}", String(circleIdentifier));
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.FORBIDDEN, "Expect a 403");

        LocalAuthorityControllerTest.circleQueryService.setup((instance) => instance.isOwnedByLocalAuthority(circleIdentifier, localAuthorityId)).returns(() => Promise.resolve(false));

        opts = {
            method: "DELETE",
            uri: AbstractTestController.getBackend() + path.replace("{localauthorityid}", String(localAuthorityId)).replace("{circleid}", String(circleIdentifier)),
            json: true
        };

        statusCode = HTTPStatusCodes.OK;
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
