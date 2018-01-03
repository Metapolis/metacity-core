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
import { suite, test } from "mocha-typescript";
import { LocalAuthority } from "../../../src/persistence/domain/LocalAuthority";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import * as TypeMoq from "typemoq";
import { User } from "../../../src/persistence/domain/User";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import { Credential } from "../../../src/persistence/domain/Credential";
import { LocalAuthorityCommandService } from "../../../src/services/command/LocalAuthorityCommandService";
import { UIConfig } from "../../../src/common/model/UIConfig";
import { Location } from "../../../src/common/model/Location";
import { UpdateLocalAuthorityCommandDTO } from "../../../src/services/command/dto/local-authority/UpdateLocalAuthorityCommandDTO";
import { isNullOrUndefined } from "util";

/**
 * All test for circle command service
 */
@suite
class LocalAuthorityCommandServiceTest extends AbstractTestService {
    @test
    private async testUpdateLocalAuthority(): Promise<void> {
        const localAuthorityId: number = 12;
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const localAuthorityCommandService: LocalAuthorityCommandService = ContextApp.container.get("LocalAuthorityCommandService");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        localAuthority.setId(localAuthorityId);
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthority.setCredential(Promise.resolve(credential));

        // UIconfig to set
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = new Location();
        uiConfig.primaryColor = "#AACCDD";
        uiConfig.secondaryColor = "#BBAACD";
        uiConfig.logo = "www.logo.gouv";
        uiConfig.location.latitude = 44.000944;
        uiConfig.location.longitude = -1.000944;
        uiConfig.location.zoomFactor = -0.4;

        const updateLocalAuthorityDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        updateLocalAuthorityDTO.setName("michel");
        updateLocalAuthorityDTO.setId(localAuthority.getId());
        updateLocalAuthorityDTO.setUIConfig(uiConfig);

        localAuthorityDao.setup((instance) => instance.findById(localAuthorityId)).returns(() => Promise.resolve(localAuthority));

        await localAuthorityCommandService.updateLocalAuthority(updateLocalAuthorityDTO);

        localAuthorityDao.verify((instance: LocalAuthorityDao) => instance.saveOrUpdate(TypeMoq.It.is((localAuthorityToSave: LocalAuthority) => {
            let ret: boolean = localAuthorityToSave.getName() === updateLocalAuthorityDTO.getName();
            ret = ret && localAuthorityToSave.getId() === localAuthority.getId();
            ret = ret && !isNullOrUndefined(localAuthorityToSave.getUIConfig());
            ret = ret && localAuthorityToSave.getUIConfig().logo === localAuthority.getUIConfig().logo;
            ret = ret && localAuthorityToSave.getUIConfig().primaryColor === localAuthority.getUIConfig().primaryColor;
            ret = ret && localAuthorityToSave.getUIConfig().secondaryColor === localAuthority.getUIConfig().secondaryColor;
            ret = ret && !isNullOrUndefined(localAuthorityToSave.getUIConfig().location);
            ret = ret && localAuthorityToSave.getUIConfig().location.latitude === localAuthority.getUIConfig().location.latitude;
            ret = ret && localAuthorityToSave.getUIConfig().location.longitude === localAuthority.getUIConfig().location.longitude;
            ret = ret && localAuthorityToSave.getUIConfig().location.zoomFactor === localAuthority.getUIConfig().location.zoomFactor;
            return ret;
        })), TypeMoq.Times.exactly(1));
    }

    @test
    private async testUpdateLocalAuthorityCommandNull() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);

        await localAuthorityCommandService.updateLocalAuthority(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandUndefined() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);

        await localAuthorityCommandService.updateLocalAuthority(undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandIdNull() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setId(null);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority's identifier cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandIdUndefined() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setId(undefined);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority's identifier cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandNameNull() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setId(1);
        localAuthorityCommandDTO.setName(null);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandNameUndefined() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName(undefined);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandNameEmpty() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("");
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandUIConfigNull() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("michel");
        localAuthorityCommandDTO.setUIConfig(null);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority ui config cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandUIConfigUndefined() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("michel");
        localAuthorityCommandDTO.setUIConfig(undefined);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority ui config cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandUIConfigLocationNull() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("michel");
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = null;
        localAuthorityCommandDTO.setUIConfig(uiConfig);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority location cannot be undefined or null");
        });
    }

    @test
    private async testUpdateLocalAuthorityCommandUIConfigLocationUndefined() {
        const localAuthorityCommandService: LocalAuthorityCommandService = (ContextApp.container.get("LocalAuthorityCommandService") as LocalAuthorityCommandService);
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("michel");
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = undefined;
        localAuthorityCommandDTO.setUIConfig(uiConfig);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority location cannot be undefined or null");
        });
    }


    @test
    private async testUpdateLocalAuthorityLocalAuthorityNotFound() {
        const localAuthorityCommandService: LocalAuthorityCommandService = ContextApp.container.get("LocalAuthorityCommandService");
        const localAuthorityCommandDTO: UpdateLocalAuthorityCommandDTO = new UpdateLocalAuthorityCommandDTO();
        localAuthorityCommandDTO.setName("michel");
        const uiConfig: UIConfig = new UIConfig();
        uiConfig.location = new Location();
        localAuthorityCommandDTO.setUIConfig(uiConfig);
        localAuthorityCommandDTO.setId(1);

        await localAuthorityCommandService.updateLocalAuthority(localAuthorityCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority with id '" + localAuthorityCommandDTO.getId() + "' cannot be found");
        });
    }
}
