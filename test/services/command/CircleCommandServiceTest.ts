import { AbstractTestService } from "../inversify/AbstractTestService";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { ContextApp } from "../../ContextApp";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { ActivityCircle } from "../../../src/persistence/domain/ActivityCircle";
import { SaveCircleCommandDTO } from "../../../src/services/command/dto/circles/SaveCircleCommandDTO";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import Circle = L.Circle;

/**
 * All test for user collectivity query service
 */
@suite
class CircleCommandServiceTest extends AbstractTestService{

    @test
    private async testCreateCircle(): Promise<void> {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);


       /* const activityCircleMock: ActivityCircle = new ActivityCircle();
        activityCircleMock.setRoles(["admin"]);
        activityCircleMock.setName("Champion");
        */

        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setName("Champion");
        saveCircleCommandDTO.setRoles(["admin"]);
        saveCircleCommandDTO.setAccessKey("accesskey");

        circleCreationMock.setup((instance) => instance.createCircle("localhost")).returns(() => Promise.resolve(activityCircleMock));

        // const circleDTO: SaveCircleCommandDTO = await circleCommandService.createCircle(saveCircleCommandDTO);
Chai.assert.equal(, activityCircleMock.getId());
    }
}