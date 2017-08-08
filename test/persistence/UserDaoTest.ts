import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { User } from "../../src/persistence/domain/User";
import { ActivityCircle } from "../../src/persistence/domain/ActivityCircle";
import { Role } from "../../src/common/enum/Role";
import { Collectivity } from "../../src/persistence/domain/Collectivity";

@suite
export class UserDaoTest {

    @test
    public async testFindByUsername(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");
        const circleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");
        const collectivityRepository: TypeORM.Repository<Collectivity> = ContextApp.container.get("CollectivityRepository");

        // Create user
        const user: User = new User();
        user.setUsername("Toto");
        user.setPassword("password");
        user.setLastConnection(Date.now());

        // Create circle
        const circle: ActivityCircle = new ActivityCircle();
        circle.setName("Stark company");
        circle.setRoles([Role.READ_ALL]);

        // Create collectivity
        const collectivity: Collectivity = new Collectivity();
        collectivity.setName("Stark corp");
        collectivity.setId("localhost");
        collectivity.setSecret("secret");

        // Persist collectivity
        await collectivityRepository.persist(collectivity);
        (await collectivity.getCircles()).push(circle);

        // Persist circle
        circle.setCollectivity(collectivity);
        await circleRepository.persist(circle);
        // Persist user
        (await user.getCircles()).push(circle);
        await userRepository.persist(user);

        const find: User = await userDao.findByUsername("Toto");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "User not found");
        Chai.assert.equal(find.getUsername(), user.getUsername());
        Chai.assert.equal(find.getLastConnection(), user.getLastConnection());
        Chai.assert.equal(find.getPassword(), user.getPassword());
        Chai.assert.equal((await find.getRoles()).join(","), [Role.READ_ALL].join(","));
        Chai.assert.equal(find.getId(), 1);
    }

    @test
    public async testFindById(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");
        const circleRepository: TypeORM.Repository<ActivityCircle> = ContextApp.container.get("ActivityCircleRepository");
        const collectivityRepository: TypeORM.Repository<Collectivity> = ContextApp.container.get("CollectivityRepository");

        // Create user
        const user: User = new User();
        user.setUsername("Toto");
        user.setPassword("password2");
        user.setLastConnection(Date.now());

        // Create circle
        const circle: ActivityCircle = new ActivityCircle();
        circle.setName("Stark company");
        circle.setRoles([Role.READ_ALL]);

        // Create collectivity
        const collectivity: Collectivity = new Collectivity();
        collectivity.setName("Stark corp");
        collectivity.setId("localhost");
        collectivity.setSecret("secret");

        // Persist collectivity
        await collectivityRepository.persist(collectivity);
        (await collectivity.getCircles()).push(circle);
        console.log(user.getLastConnection());

        // Persist circle
        circle.setCollectivity(collectivity);
        await circleRepository.persist(circle);
        // Persist user
        (await user.getCircles()).push(circle);
        await userRepository.persist(user);
        console.log(user.getLastConnection());
        const find: User = await userDao.findById(user.getId());

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "User not found");
        Chai.assert.equal(find.getUsername(), user.getUsername());
        Chai.assert.equal(find.getLastConnection(), user.getLastConnection());
        Chai.assert.equal(find.getPassword(), user.getPassword());
        Chai.assert.equal((await find.getRoles()).join(","), [Role.READ_ALL].join(","));
        Chai.assert.equal(find.getId(), user.getId());
    }
}
