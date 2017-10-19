
import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CircleDao} from "../../src/persistence/dao/CircleDao";
import { Circle } from "../../src/persistence/domain/Circle";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { Credential } from "../../src/persistence/domain/Credential";
import { AbstractTestDao } from "./inversify/AbstractTestService";

@suite
export class CircleDaoTest extends AbstractTestDao {

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

        await circleRepository.save(circle);

        let isExists: boolean = await circleDao.exists(circle.getId());

        Chai.assert.isTrue(isExists);

        isExists = await circleDao.exists(circle.getId() + 2);

        Chai.assert.isFalse(isExists);
    }

    @test
    public async testFindAll(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circles: Circle[] = [];
        circles.push(new Circle());
        circles[0].setName("o");
        circles[0].setRoles(["Muse of nachos"]);
        circles[0].setDefaultCircle(false);
        circles.push(new Circle());
        circles[1].setName("Ness is Sans");
        circles[1].setRoles(["Spooky skeleton"]);
        circles[1].setDefaultCircle(true);

        await circleRepository.save(circles);

        const actualCircles: Circle[] = await circleDao.findAll();

        for ( let i: number = 0; i < 2; i++ ) {
            Chai.assert.equal(actualCircles[i].getId(), circles[i].getId());
            Chai.assert.equal(actualCircles[i].getName(), circles[i].getName());
            Chai.assert.deepEqual(actualCircles[i].getRoles(), circles[i].getRoles());
            Chai.assert.equal(actualCircles[i].isDefaultCircle(), circles[i].isDefaultCircle());
        }
    }

    @test
    public async testFindById(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleRepository.save(circle);

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
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Stark Corp");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        await localAuthorityRepository.save(localAuthority);

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        circle.setDefaultCircle(true);

        await circleRepository.save(circle);

        let isOwnedByLocalAuthority: boolean = await circleDao.isOwnedByLocalAuthority(circle.getId(), (await localAuthority.getCredential()).getAccessKey());

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, "toto");

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId(), "toto");

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, (await localAuthority.getCredential()).getAccessKey());

        Chai.assert.isFalse(isOwnedByLocalAuthority);
    }
}
