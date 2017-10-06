import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { AbstractTestDao } from "./inversify/AbstractTestService";

@suite
export class LocalAuthorityDaoTest extends AbstractTestDao {

    @test
    public async testFindById(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Toto");
        localAuthority.setSecret("secret");
        localAuthority.setId("localhost");

        await localAuthorityRepository.persist(localAuthority);
        const find: LocalAuthority = await localAuthorityDao.findById("localhost");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "LocalAuthority not found");
        Chai.assert.equal(find.getName(), localAuthority.getName());
        Chai.assert.equal(find.getSecret(), localAuthority.getSecret());
        Chai.assert.equal(find.getId(), localAuthority.getId());
    }
}
