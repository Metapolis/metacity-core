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

import { AbstractTestService } from "../inversify/AbstractTestService";
import { LocalAuthorityQueryService } from "../../../src/services/query/LocalAuthorityQueryService";
import { ContextApp } from "../../ContextApp";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../src/persistence/domain/LocalAuthority";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { Credential } from "../../../src/persistence/domain/Credential";
import { LocalAuthorityDTO } from "../../../src/services/query/dto/localauthority/LocalAuthorityDTO";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";

/**
 * All test for user localAuthority query service
 */
@suite
class LocalAuthorityQueryServiceTest extends AbstractTestService {

    @test
    private async testGetLocalAuthority(): Promise<void> {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);

        const localAuthority: LocalAuthority = new LocalAuthority();
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("localhost");
        localAuthority.setCredential(Promise.resolve(credential));
        localAuthority.setId(12);
        localAuthority.setName("nameKebab");
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthority));

        let localAuthorityDTO: LocalAuthorityDTO = await localAuthorityQueryService.getLocalAuthority("localhost");

        Chai.assert.equal(localAuthorityDTO.getId(), localAuthority.getId());
        Chai.assert.equal(localAuthorityDTO.getSecret(), (await localAuthority.getCredential()).getSecret());
        Chai.assert.equal(localAuthorityDTO.getName(), localAuthority.getName());

        localAuthorityDTO = await localAuthorityQueryService.getLocalAuthority("localhost2");

        Chai.assert.isNull(localAuthorityDTO);
    }

    @test
    private async testFindLocalAuthorityWithNullDomain() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthority(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }

    @test
    private async testFindLocalAuthorityWithEmptyDomain() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthority("").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }

    @test
    private async testIsExists(): Promise<void> {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);

        localAuthorityDaoMock.setup((instance) => instance.isExists(12)).returns(() => Promise.resolve(true));
        localAuthorityDaoMock.setup((instance) => instance.isExists(10)).returns(() => Promise.resolve(false));

        let exists: boolean = await localAuthorityQueryService.isExists(12);

        Chai.assert.isTrue(exists);

        exists = await localAuthorityQueryService.isExists(10);

        Chai.assert.isFalse(exists);
    }
}
