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
import { AbstractTestDao } from "./inversify/AbstractTestDao";
import { Credential } from "../../src/persistence/domain/Credential";
import { Role } from "../../src/common/enum/Role";
import { CredentialDao } from "../../src/persistence/dao/CredentialDao";

@suite
export class CredentialDaoTest extends AbstractTestDao {

    @test
    public async testFindByAccessKey(): Promise<void> {
        const credentialDao: CredentialDao = ContextApp.container.get("CredentialDao");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        credential.setRoles([Role.ACCESS_TWEET]);
        await credentialRepository.save(credential);

        const find: Credential = await credentialDao.findByAccessKey("AccessKey");

        Chai.assert.isNotNull(find);
        Chai.assert.isFalse(find === undefined, "Credential not found");
        Chai.assert.equal(find.getSecret(), credential.getSecret());
        Chai.assert.equal(find.getAccessKey(), credential.getAccessKey());
        Chai.assert.equal(find.getRoles().length, credential.getRoles().length);
        for (let i = 0; i < find.getRoles().length; i++) {
            Chai.assert.equal(find.getRoles()[i], credential.getRoles()[i]);

        }
    }
}
