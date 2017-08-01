import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { User } from "../../src/persistence/domain/User";

@suite
export class UserDaoTest {

    @test
    public async testFindByUsername(): Promise<void> {
        const userDao: UserDao = ContextApp.container.get("UserDao");
        const userRepository: TypeORM.Repository<User> = ContextApp.container.get("UserRepository");

        const userMock: User = new User();
        userMock.setUsername("Toto");
        userMock.setPassword("password");

        await userRepository.persist(userMock);
        const find: User = await userDao.findByUsername("Toto");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "User not found");
        Chai.assert.equal(find.getUsername(), userMock.getUsername());
        Chai.assert.equal(find.getPassword(), userMock.getPassword());
        Chai.assert.equal(find.getId(), 1);
    }
}
