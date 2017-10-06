
import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CircleDao} from "../../src/persistence/dao/CircleDao";
import { Circle } from "../../src/persistence/domain/Circle";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";

@suite
export class CircleDaoTest {

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleDao.saveOrUpdate(circle);

        const actual: Circle = await circleRepository.findOneById(circle.getId());

        Chai.assert.isTrue((await circleRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), circle.getId());
        Chai.assert.deepEqual(actual.getRoles(), circle.getRoles());
        Chai.assert.equal(actual.getName(), circle.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circle.isDefaultCircle());

    }

    @test
    public async testIsExists(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleRepository.persist(circle);

        let isExists: boolean = await circleDao.exists(circle.getId());

        Chai.assert.isTrue(isExists);

        isExists = await circleDao.exists(circle.getId() + 2);

        Chai.assert.isFalse(isExists);
    }

    @test
    public async testFindById(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleRepository.persist(circle);

        let actual: Circle = await circleDao.findById(circle.getId());

        Chai.assert.equal(actual.getId(), circle.getId());
        Chai.assert.deepEqual(actual.getRoles(), circle.getRoles());
        Chai.assert.equal(actual.getName(), circle.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circle.isDefaultCircle());

        actual = await circleDao.findById(circle.getId() + 2);

        Chai.assert.isTrue(actual === undefined);
    }

    @test
    public async testIsOwnedByLocalAuthority(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Stark Corp");
        localAuthority.setId("AccessKey");
        localAuthority.setSecret("danslavieparfoismaispasseulement");
        await localAuthorityRepository.persist(localAuthority);

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        circle.setDefaultCircle(true);

        await circleRepository.persist(circle);

        let isOwnedByLocalAuthority: boolean = await circleDao.isOwnedByLocalAuthority(circle.getId(), localAuthority.getId());

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, "toto");

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId(), "toto");

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, localAuthority.getId());

        Chai.assert.isFalse(isOwnedByLocalAuthority);
    }
}
