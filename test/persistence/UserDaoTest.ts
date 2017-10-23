import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { User } from "../../src/persistence/domain/User";
import { Circle } from "../../src/persistence/domain/Circle";
import { Role } from "../../src/common/enum/Role";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { AbstractTestDao } from "./inversify/AbstractTestService";
import { Credential } from "../../src/persistence/domain/Credential";

@suite
export class UserDaoTest extends AbstractTestDao {

    @test
    public async testFindByEmail(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        // Create user
        const user: User = new User();
        user.setFirstName("Toto");
        user.setLastName("Nom");
        user.setPassword("password");
        user.setEmail("john@cena.com");
        user.setLastConnection(Date.now());

        // Create circle
        const circle: Circle = new Circle();
        circle.setName("Stark assembly");
        circle.setRoles([Role.READ_ALL]);
        circle.setDefaultCircle(true);

        // Create localAuthority
        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Stark corp");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        // Persist localAuthority
        await localAuthorityRepository.save(localAuthority);
        (await localAuthority.getCircles()).push(circle);

        // Persist circle
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        await circleRepository.save(circle);
        // Persist user
        (await user.getCircles()).push(circle);
        await userRepository.save(user);

        let find: User = await userDao.findByEmail("john@cena.com");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "User not found");
        Chai.assert.equal(find.getEmail(), user.getEmail());
        Chai.assert.equal(find.getLastConnection(), user.getLastConnection());
        Chai.assert.equal(find.getPassword(), user.getPassword());
        Chai.assert.equal(find.getEmail(), user.getEmail());
        Chai.assert.equal((await find.getRoles()).join(","), [Role.READ_ALL].join(","));
        Chai.assert.equal(find.getId(), 1);

        find = await userDao.findByEmail("TotoFAKE");

        Chai.assert.isTrue(find === undefined, "User should not be found");
    }

    @test
    public async testFindById(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        // Create user
        const user: User = new User();
        user.setFirstName("John");
        user.setLastName("Cena");
        user.setPassword("password2");
        user.setEmail("john@cena");
        user.setLastConnection(Date.now());

        // Create circle
        const circle: Circle = new Circle();
        circle.setName("Stark industry");
        circle.setRoles([Role.READ_ALL]);
        circle.setDefaultCircle(true);

        // Create localAuthority
        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Stark corp");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        // Persist localAuthority
        await localAuthorityRepository.save(localAuthority);
        (await localAuthority.getCircles()).push(circle);
        console.log(user.getLastConnection());

        // Persist circle
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        await circleRepository.save(circle);
        // Persist user
        (await user.getCircles()).push(circle);
        await userRepository.save(user);
        console.log(user.getLastConnection());
        let find: User = await userDao.findById(user.getId());

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "User not found");
        Chai.assert.equal(find.getEmail(), user.getEmail());
        Chai.assert.equal(find.getLastConnection(), user.getLastConnection());
        Chai.assert.equal(find.getPassword(), user.getPassword());
        Chai.assert.equal(find.getEmail(), user.getEmail());
        Chai.assert.equal((await find.getRoles()).join(","), [Role.READ_ALL].join(","));
        Chai.assert.equal(find.getId(), user.getId());

        find = await userDao.findById(user.getId() + 2);

        Chai.assert.isTrue(find === undefined, "User should not be found");
    }

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");

        const user: User = new User();
        user.setFirstName("Toto");
        user.setLastName("Nom");
        user.setPassword("Yolo");
        user.setEmail("michel@bresil");

        await userDao.saveOrUpdate(user);

        const actual: User = await userRepository.findOneById(user.getId());
        console.log(await userRepository.find());

        Chai.assert.isTrue((await userRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), user.getId());
        Chai.assert.equal(actual.getPassword(), user.getPassword());
        Chai.assert.equal(actual.getEmail(), user.getEmail());
        Chai.assert.equal(actual.getEmail(), user.getEmail());

    }
}
