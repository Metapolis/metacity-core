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
import { LocalAuthorityDTO } from "../../../src/services/query/dto/local-authority/LocalAuthorityDTO";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { UIConfig } from "../../../src/common/model/UIConfig";
import { Location } from "../../../src/common/model/Location";
import { isNullOrUndefined } from "util";

/**
 * All test for user localAuthority query service
 */
@suite
class LocalAuthorityQueryServiceTest extends AbstractTestService {

    @test
    private async testGetLocalAuthorityByAccessKey(): Promise<void> {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);

        const localAuthority: LocalAuthority = new LocalAuthority();
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("localhost");
        localAuthority.setCredential(Promise.resolve(credential));
        localAuthority.setId(12);
        localAuthority.setName("nameKebab");
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

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthority));

        let localAuthorityDTO: LocalAuthorityDTO = await localAuthorityQueryService.getLocalAuthorityByAccessKey("localhost");

        Chai.assert.equal(localAuthorityDTO.getId(), localAuthority.getId());
        Chai.assert.equal(localAuthorityDTO.getSecret(), (await localAuthority.getCredential()).getSecret());
        Chai.assert.equal(localAuthorityDTO.getName(), localAuthority.getName());
        Chai.assert.isTrue(!isNullOrUndefined(localAuthorityDTO.getUIConfig()));
        Chai.assert.isTrue(!isNullOrUndefined(localAuthorityDTO.getUIConfig().location));
        Chai.assert.deepEqual(localAuthorityDTO.getUIConfig(), localAuthority.getUIConfig());

        localAuthorityDTO = await localAuthorityQueryService.getLocalAuthorityByAccessKey("localhost2");

        Chai.assert.isUndefined(localAuthorityDTO);
    }

    @test
    private async testFindLocalAuthorityByAccessKeyWithAccessKeyNull() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthorityByAccessKey(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Access key cannot be null or empty");
        });
    }

    @test
    private async testFindLocalAuthorityByAccessKeyWithAccessKeyEmpty() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthorityByAccessKey("").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Access key cannot be null or empty");
        });
    }

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
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = new Location();
        uiConfig.primaryColor = "#AACCDD";
        uiConfig.secondaryColor = "#BBAACD";
        uiConfig.logo = "www.logo.gouv";
        uiConfig.location.latitude = 44.000944;
        uiConfig.location.longitude = -1.000944;
        uiConfig.location.zoomFactor = -0.4;
        localAuthority.setUIConfig(uiConfig);

        localAuthorityDaoMock.setup((instance) => instance.findById(12)).returns(() => Promise.resolve(localAuthority));

        let localAuthorityDTO: LocalAuthorityDTO = await localAuthorityQueryService.getLocalAuthority(12);

        Chai.assert.equal(localAuthorityDTO.getId(), localAuthority.getId());
        Chai.assert.equal(localAuthorityDTO.getSecret(), (await localAuthority.getCredential()).getSecret());
        Chai.assert.equal(localAuthorityDTO.getName(), localAuthority.getName());
        Chai.assert.isTrue(!isNullOrUndefined(localAuthorityDTO.getUIConfig()));
        Chai.assert.isTrue(!isNullOrUndefined(localAuthorityDTO.getUIConfig().location));
        Chai.assert.deepEqual(localAuthorityDTO.getUIConfig(), localAuthority.getUIConfig());

        localAuthorityDTO = await localAuthorityQueryService.getLocalAuthority(13);

        Chai.assert.isUndefined(localAuthorityDTO);
    }

    @test
    private async testFindLocalAuthorityWithIdentifierNull() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthorityByAccessKey(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Access key cannot be null or empty");
        });
    }

    @test
    private async testFindLocalAuthorityWithIdentifierEmpty() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthorityByAccessKey("").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Access key cannot be null or empty");
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
