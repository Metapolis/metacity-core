
import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CircleDao} from "../../src/persistence/dao/CircleDao";
import { ActivityCircle} from "../../src/persistence/domain/ActivityCircle";

@suite
export class CircleDaoTest {

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const activityCircleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setName("Michel");
        activityCircle.setRoles(["Champion"]);
        activityCircle.setId(1);

        await circleDao.saveOrUpdate(activityCircle);

        const actual: ActivityCircle = await activityCircleRepository.findOneById(activityCircle.getId());

        Chai.assert.isTrue((await activityCircleRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), activityCircle.getId());
        Chai.assert.deepEqual(actual.getRoles(), activityCircle.getRoles());
        Chai.assert.equal(actual.getName(), activityCircle.getName());
    }
}
