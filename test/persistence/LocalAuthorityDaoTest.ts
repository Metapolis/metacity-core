/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { AbstractTestDao } from "./inversify/AbstractTestDao";
import { Credential } from "../../src/persistence/domain/Credential";
import { Role } from "../../src/common/enum/Role";
import { CircleDao } from "../../src/persistence/dao/CircleDao";
import { Circle } from "../../src/persistence/domain/Circle";
import { UIConfig } from "../../src/common/model/UIConfig";
import { Location } from "../../src/common/model/Location";
import { isNullOrUndefined } from "util";

@suite
export class LocalAuthorityDaoTest extends AbstractTestDao {

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Michel");
        localAuthority.setUIConfig(new UIConfig());
        await localAuthorityDao.saveOrUpdate(localAuthority);

        const actual: LocalAuthority = await localAuthorityRepository.findOneById(localAuthority.getId());

        Chai.assert.isTrue((await localAuthorityRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), localAuthority.getId());
        Chai.assert.deepEqual(actual.getUIConfig(), localAuthority.getUIConfig());
        Chai.assert.equal(actual.getName(), localAuthority.getName());
    }

    @test
    public async testFindById(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Toto");
        // UIconfig to set
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = new Location();
        uiConfig.primaryColor = "#AACCDD";
        uiConfig.secondaryColor = "#BBAACD";
        uiConfig.logo = "www.logo.gouv";
        uiConfig.location.latitude = 44.000944;
        uiConfig.location.longitude = -1.000944;
        uiConfig.location.zoomFactor = -0.4;
        localAuthority.setUIConfig(uiConfig);

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        credential.setRoles([Role.ACCESS_TWEET]);
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
        Chai.assert.isTrue(!isNullOrUndefined(find.getUIConfig()));
        Chai.assert.equal(find.getUIConfig().secondaryColor, localAuthority.getUIConfig().secondaryColor);
        Chai.assert.equal(find.getUIConfig().primaryColor, localAuthority.getUIConfig().primaryColor);
        Chai.assert.equal(find.getUIConfig().logo, localAuthority.getUIConfig().logo);
        Chai.assert.isTrue(!isNullOrUndefined(find.getUIConfig().location));
        Chai.assert.equal(find.getUIConfig().location.zoomFactor, localAuthority.getUIConfig().location.zoomFactor);
        Chai.assert.equal(find.getUIConfig().location.latitude, localAuthority.getUIConfig().location.latitude);
        Chai.assert.equal(find.getUIConfig().location.longitude, localAuthority.getUIConfig().location.longitude);
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
        credential.setRoles([Role.ACCESS_TWEET]);
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

    @test
    public async testIsExists(): Promise<void> {
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Michel");

        await localAuthorityRepository.save(localAuthority);

        let isExists: boolean = await localAuthorityDao.isExists(localAuthority.getId());

        Chai.assert.isTrue(isExists);

        isExists = await localAuthorityDao.isExists(localAuthority.getId() + 2);

        Chai.assert.isFalse(isExists);
    }
}
