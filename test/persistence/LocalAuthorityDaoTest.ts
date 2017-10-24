import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { AbstractTestDao } from "./inversify/AbstractTestDao";
import { Credential } from "../../src/persistence/domain/Credential";

@suite
export class LocalAuthorityDaoTest extends AbstractTestDao {

    @test
    public async testFindById(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Toto");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        await localAuthorityRepository.save(localAuthority);

        await localAuthorityRepository.save(localAuthority);
        const find: LocalAuthority = await localAuthorityDao.findById(localAuthority.getId());

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "LocalAuthority not found");
        Chai.assert.equal(find.getName(), localAuthority.getName());
        Chai.assert.equal((await find.getCredential()).getSecret(), (await localAuthority.getCredential()).getSecret());
        Chai.assert.equal((await find.getCredential()).getAccessKey(), (await localAuthority.getCredential()).getAccessKey());
        Chai.assert.equal(find.getId(), localAuthority.getId());
    }

    @test
    public async testFindByAccessKey(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Toto");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        await localAuthorityRepository.save(localAuthority);

        await localAuthorityRepository.save(localAuthority);
        const find: LocalAuthority = await localAuthorityDao.findByCredentialAccessKey("AccessKey");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "LocalAuthority not found");
        Chai.assert.equal(find.getName(), localAuthority.getName());
        Chai.assert.equal((await find.getCredential()).getSecret(), (await localAuthority.getCredential()).getSecret());
        Chai.assert.equal((await find.getCredential()).getAccessKey(), (await localAuthority.getCredential()).getAccessKey());
        Chai.assert.equal(find.getId(), localAuthority.getId());
    }
}
