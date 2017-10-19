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
import { FindUserQuery } from "../../src/common/query/FindUserQuery";
import { LogicalQueryCriteria } from "../../src/common/query/LogicalQueryCriteria";

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
    public async testFindBy(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");

        const users: User[] = [];

        // Create user 1
        const user1: User = new User();
        user1.setFirstName("John");
        user1.setLastName("Cena");
        user1.setPassword("password2");
        user1.setEmail("john@cena");

        // Create user 2
        const user2: User = new User();
        user2.setFirstName("John-Snowden");
        user2.setLastName("Kebab");
        user2.setPassword("password2");
        user2.setEmail("snow@la.com");

        // Create user 3
        const user3: User = new User();
        user3.setFirstName("Tony");
        user3.setLastName("Stark");
        user3.setPassword("password2");
        user3.setEmail("tony@stark.com");

        users.push(user1);
        users.push(user2);
        users.push(user3);

        // Persist user
        await userRepository.save(user1);
        await userRepository.save(user2);
        await userRepository.save(user3);

        const query: FindUserQuery = new FindUserQuery();

        let find: User[] = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 3);
        for (let i = 0; i < find.length; i++) {
            this.assertUser(find[i], users[i]);
        }

        // Find only one
        query.setLimit(1);
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 1);
        this.assertUser(find[0], users[0]);

        // Find "ton" must
        query.setLimit(10);
        query.setQFilter(new LogicalQueryCriteria<string>(["ton"], []));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 1);
        this.assertUser(find[0], users[2]);

        // Find by id must
        query.setQFilter(new LogicalQueryCriteria<string>(["2"], []));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 1);
        this.assertUser(find[0], users[1]);

        // Find two by must
        query.setQFilter(new LogicalQueryCriteria<string>(["ohn"], []));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 2);
        this.assertUser(find[0], users[0]);
        this.assertUser(find[1], users[1]);

        // Find one by must and offset
        query.setOffset(1);
        query.setQFilter(new LogicalQueryCriteria<string>(["ohn"], []));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 1);
        this.assertUser(find[0], users[1]);

        // Find with two should string
        query.setOffset(0);
        query.setQFilter(new LogicalQueryCriteria<string>([], ["ohn", "ton"]));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 3);
        for (let i = 0; i < find.length; i++) {
            this.assertUser(find[i], users[i]);
        }

        // Find with two should string and number
        query.setQFilter(new LogicalQueryCriteria<string>([], ["ohn", "3"]));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 3);
        for (let i = 0; i < find.length; i++) {
            this.assertUser(find[i], users[i]);
        }

        // Find with two should string and one must
        query.setQFilter(new LogicalQueryCriteria<string>(["2"], ["ohn", "ton"]));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 1);
        this.assertUser(find[0], users[1]);

        // Find with two should string and one must
        query.setQFilter(new LogicalQueryCriteria<string>(["23333"], ["ohn", "ton"]));
        find = await userDao.findBy(query);

        Chai.assert.isNotNull(find);
        Chai.assert.equal(find.length, 0);
    }

    @test
    public async testCountBy(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");

        const users: User[] = [];

        // Create user 1
        const user1: User = new User();
        user1.setFirstName("John");
        user1.setLastName("Cena");
        user1.setPassword("password2");
        user1.setEmail("john@cena");

        // Create user 2
        const user2: User = new User();
        user2.setFirstName("John-Snowden");
        user2.setLastName("Kebab");
        user2.setPassword("password2");
        user2.setEmail("snow@la.com");

        // Create user 3
        const user3: User = new User();
        user3.setFirstName("Tony");
        user3.setLastName("Stark");
        user3.setPassword("password2");
        user3.setEmail("tony@stark.com");

        users.push(user1);
        users.push(user2);
        users.push(user3);

        // Persist user
        await userRepository.save(user1);
        await userRepository.save(user2);
        await userRepository.save(user3);

        const query: FindUserQuery = new FindUserQuery();

        let count: number = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 3);

        // Count "ton" must
        query.setQFilter(new LogicalQueryCriteria<string>(["ton"], []));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 1);

        // Count by id must
        query.setQFilter(new LogicalQueryCriteria<string>(["2"], []));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 1);

        // Count two by must
        query.setQFilter(new LogicalQueryCriteria<string>(["ohn"], []));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 2);

        // Count with two should string
        query.setQFilter(new LogicalQueryCriteria<string>([], ["ohn", "ton"]));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 3);

        // Count with two should string and number
        query.setQFilter(new LogicalQueryCriteria<string>([], ["ohn", "3"]));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 3);

        // Count with two should string and one must
        query.setQFilter(new LogicalQueryCriteria<string>(["2"], ["ohn", "ton"]));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 1);

        // Count with two should string and one must
        query.setQFilter(new LogicalQueryCriteria<string>(["23333"], ["ohn", "ton"]));
        count = await userDao.countBy(query);

        Chai.assert.isNotNull(count);
        Chai.assert.equal(count, 0);
    }

    @test
    public async testSaveOrUpdate(): Promise<void> {
        // Test is not passing because the same repository is used for all tests
        // DB destruction before and after test to be implemented
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

    private assertUser(actual: User, expected: User) {
        Chai.assert.equal(actual.getEmail(), expected.getEmail());
        Chai.assert.equal(actual.getLastConnection(), expected.getLastConnection());
        Chai.assert.equal(actual.getPassword(), expected.getPassword());
        Chai.assert.equal(actual.getEmail(), expected.getEmail());
        Chai.assert.equal(actual.getId(), expected.getId());
    }
}
