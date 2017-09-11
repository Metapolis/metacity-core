import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CollectivityDao } from "../../src/persistence/dao/CollectivityDao";
import { Collectivity } from "../../src/persistence/domain/Collectivity";
import { AbstractTestDao } from "./inversify/AbstractTestService";

@suite
export class CollectivityDaoTest extends AbstractTestDao {

    @test
    public async testFindById(): Promise<void> {
        const collectivityDao: CollectivityDao = ContextApp.container.get("CollectivityDao");
        const collectivityRepository: TypeORM.Repository<Collectivity> = ContextApp.container.get("CollectivityRepository");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setName("Toto");
        collectivity.setSecret("secret");
        collectivity.setId("localhost");

        await collectivityRepository.persist(collectivity);
        const find: Collectivity = await collectivityDao.findById("localhost");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "Collectivity not found");
        Chai.assert.equal(find.getName(), collectivity.getName());
        Chai.assert.equal(find.getSecret(), collectivity.getSecret());
        Chai.assert.equal(find.getId(), collectivity.getId());
    }
}
