
import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CircleDao} from "../../src/persistence/dao/CircleDao";
import { ActivityCircle} from "../../src/persistence/domain/ActivityCircle";
import { Collectivity } from "../../src/persistence/domain/Collectivity";

@suite
export class CircleDaoTest {

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const activityCircleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setName("Michel");
        activityCircle.setRoles(["Champion"]);

        await circleDao.saveOrUpdate(activityCircle);

        const actual: ActivityCircle = await activityCircleRepository.findOneById(activityCircle.getId());

        Chai.assert.isTrue((await activityCircleRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), activityCircle.getId());
        Chai.assert.deepEqual(actual.getRoles(), activityCircle.getRoles());
        Chai.assert.equal(actual.getName(), activityCircle.getName());
    }

    @test
    public async testIsExists(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const activityCircleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setName("Michel");
        activityCircle.setRoles(["Champion"]);

        await activityCircleRepository.persist(activityCircle);

        let isExists: boolean = await circleDao.exists(activityCircle.getId());

        Chai.assert.isTrue(isExists);

        isExists = await circleDao.exists(activityCircle.getId() + 2);

        Chai.assert.isFalse(isExists);
    }

    @test
    public async testFindById(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const activityCircleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setName("Michel");
        activityCircle.setRoles(["Champion"]);

        await activityCircleRepository.persist(activityCircle);

        let actual: ActivityCircle = await circleDao.findById(activityCircle.getId());

        Chai.assert.equal(actual.getId(), activityCircle.getId());
        Chai.assert.deepEqual(actual.getRoles(), activityCircle.getRoles());
        Chai.assert.equal(actual.getName(), activityCircle.getName());

        actual = await circleDao.findById(activityCircle.getId() + 2);

        Chai.assert.isTrue(actual === undefined);
    }

    @test
    public async testIsOwnedByCollectivity(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const activityCircleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");
        const collectivityRepository: TypeORM.Repository<Collectivity> = ContextApp.container.get("CollectivityRepository");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setName("Stark Corp");
        collectivity.setId("AccessKey");
        collectivity.setSecret("danslavieparfoismaispasseulement");
        await collectivityRepository.persist(collectivity);

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setName("Michel");
        activityCircle.setRoles(["Champion"]);
        activityCircle.setCollectivity(Promise.resolve(collectivity));

        await activityCircleRepository.persist(activityCircle);

        let isOwnedByCollectivity: boolean = await circleDao.isOwnedByCollectivity(activityCircle.getId(), collectivity.getId());

        Chai.assert.isTrue(isOwnedByCollectivity);

        isOwnedByCollectivity = await circleDao.isOwnedByCollectivity(activityCircle.getId() + 2, "toto");

        Chai.assert.isFalse(isOwnedByCollectivity);

        isOwnedByCollectivity = await circleDao.isOwnedByCollectivity(activityCircle.getId(), "toto");

        Chai.assert.isFalse(isOwnedByCollectivity);

        isOwnedByCollectivity = await circleDao.isOwnedByCollectivity(activityCircle.getId() + 2, collectivity.getId());

        Chai.assert.isFalse(isOwnedByCollectivity);
    }
}
