import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import { ResultList } from "../../src/common/ResultList";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import { TestUtils } from "../common/TestUtils";
import { ActivityCircle } from "../../src/persistence/domain/ActivityCircle";
import { Collectivity } from "../../src/persistence/domain/Collectivity";
import { CollectivityDao } from "../../src/persistence/dao/CollectivityDao";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { Role } from "../../src/common/enum/Role";

import { CircleCommandService } from "../../src/services/command/CircleCommandService";
import { SaveCircleCommandDTO } from "../../src/services/command/dto/circles/SaveCircleCommandDTO";
import {NumberIdentifier} from "../../src/controllers/rest/model/circle/SaveCircle";

@suite
export class CollectivityControllerTest extends AbstractTestController {

    @test
    public async testCreateCollectivityCircle(): Promise<void> {
        // create a DTO from a circle
        // mock the comportment of createCircle to get the Id
        // compare the Id with DTO'expected Id
        const circleCommandServiceMock: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        circleCommandServiceMock.setup((instance) => instance.createCircle(/*DTO*/)).returns(() => Promise.resolve(NumberIdentifier));


        const circleDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleDTO.setAccessKey("accesskey");
        circleDTO.setRoles(["Michel"]);
        circleDTO.setName("CercleDesMichelsDisparus");

        Chai.assert.equal(,)
    }

}