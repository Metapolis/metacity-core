import { AbstractTestService } from "../inversify/AbstractTestService";

/**
 * All test for user collectivity query service
 */
//@suite
class CircleCommandServiceTest extends AbstractTestService{

    //@test
    private async testCreateCircle(): Promise<void> {
        /*const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);


       /!* const activityCircleMock: ActivityCircle = new ActivityCircle();
        activityCircleMock.setRoles(["admin"]);
        activityCircleMock.setName("Champion");
        *!/

        const saveCircleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleCommandDTO.setName("Champion");
        saveCircleCommandDTO.setRoles(["admin"]);
        saveCircleCommandDTO.setAccessKey("accesskey");

        circleCreationMock.setup((instance) => instance.createCircle("localhost")).returns(() => Promise.resolve(activityCircleMock));

        // const circleDTO: SaveCircleCommandDTO = await circleCommandService.createCircle(saveCircleCommandDTO);
Chai.assert.equal(, activityCircleMock.getId());*/
    }
}