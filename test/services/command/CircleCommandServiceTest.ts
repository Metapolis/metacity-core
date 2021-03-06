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
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import { Circle } from "../../../src/persistence/domain/Circle";
import { SaveCircleCommandDTO } from "../../../src/services/command/dto/circle/SaveCircleCommandDTO";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { LocalAuthority } from "../../../src/persistence/domain/LocalAuthority";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { User } from "../../../src/persistence/domain/User";
import { UpdateCircleCommandDTO } from "../../../src/services/command/dto/circle/UpdateCircleCommandDTO";
import { Credential } from "../../../src/persistence/domain/Credential";
import { UserDao } from "../../../src/persistence/dao/UserDao";

/**
 * All test for circle command service
 */
@suite
class CircleCommandServiceTest extends AbstractTestService {

    /**
     * Test function  create circle
     * @returns {Promise<void>}
     */
    @test
    private async testCreateCircle(): Promise<void> {
        const accessKey: number = 5;
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        localAuthority.setCredential(Promise.resolve(credential));

        const saveCircleDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleDTO.setLocalAuthorityId(accessKey);
        saveCircleDTO.setRoles(["Role"]);
        saveCircleDTO.setName("michel");
        saveCircleDTO.setMembers([1]);
        saveCircleDTO.setDefaultCircle(true);

        localAuthorityDao.setup((instance) => instance.findById(accessKey)).returns(() => Promise.resolve(localAuthority));

        await circleCommandService.createCircle(saveCircleDTO);

        circleDao.verify((instance: CircleDao) => instance.saveOrUpdate(TypeMoq.It.is((circle: Circle) => {
            let ret: boolean = circle.getName() === saveCircleDTO.getName();
            circle.getUsers().then((value) => {
                ret = ret && value.length === saveCircleDTO.getMembers().length;
                for (let i = 0; i < saveCircleDTO.getMembers().length; i++) {
                    ret = ret && value[i].getId() === saveCircleDTO.getMembers()[i];
                }
            });
            ret = ret && circle.getRoles().length === saveCircleDTO.getRoles().length;
            for (let i = 0; i < saveCircleDTO.getRoles().length; i++) {
                ret = ret && circle.getRoles()[i] === saveCircleDTO.getRoles()[i];
            }
            ret = ret && circle.isDefaultCircle() === saveCircleDTO.isDefaultCircle();
            return ret;
        })), TypeMoq.Times.exactly(1));
    }

    @test
    private async testCreateCircleCommandNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);

        await circleCommandService.createCircle(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testCreateCircleCommandUndefined() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);

        await circleCommandService.createCircle(undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testCreateCircleDefaultNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(null);
        circleCommandDTO.setName("abab");
        circleCommandDTO.setRoles([]);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Default circle cannot be undefined or null");
        });
    }

    @test
    private async testCreateCircleCommandDefaultUndefined() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(undefined);
        circleCommandDTO.setName("a");
        circleCommandDTO.setRoles([]);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Default circle cannot be undefined or null");
        });
    }

    @test
    private async testCreateCircleCommandNameNull() {

        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setName(null);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testCreateCircleCommandNameEmpty() {

        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setName("");

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testCreateCircleCommandNameUndefined() {

        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setName(undefined);
        circleCommandDTO.setDefaultCircle(true);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testCreateCircleCommandRoleNull() {

        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles(null);
        circleCommandDTO.setDefaultCircle(true);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's roles cannot be null");
        });
    }

    @test
    private async testCreateCircleLocalAuthorityNotFound() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setLocalAuthorityId(1);
        circleCommandDTO.setDefaultCircle(true);

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority for access key : '" + circleCommandDTO.getLocalAuthorityId() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircle(): Promise<void> {
        const localAuthorityId: number = 12;
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthority.setCredential(Promise.resolve(credential));

        const user: User = new User();
        user.setId(42);
        user.setFirstName("romain");
        user.setLastName("rambal");
        user.setEmail("aa@aa.com");

        const user2: User = new User();
        user2.setId(43);
        user2.setFirstName("nicolas");
        user2.setLastName("jellab");
        user2.setEmail("cc@cc.com");

        const user3: User = new User();
        user3.setId(44);
        user3.setFirstName("mathieu");
        user3.setLastName("bayou");
        user3.setEmail("bb@bb.com");

        const circle: Circle = new Circle();
        const users: User[] = [];
        users.push(user2);
        users.push(user3);

        circle.setId(1);
        circle.setRoles(["READ_ALL"]);
        circle.setName("Jean de la tourette");
        circle.setDefaultCircle(true);
        circle.setUsers(Promise.resolve(users));
        circle.setLocalAuthority(Promise.resolve(localAuthority));

        const updateCircleDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        updateCircleDTO.setLocalAuthorityId(localAuthorityId);
        updateCircleDTO.setRoles(["Role"]);
        updateCircleDTO.setName("michel");
        updateCircleDTO.setDefaultCircle(true);
        updateCircleDTO.setMembers([42]);
        updateCircleDTO.setId(circle.getId());

        localAuthorityDao.setup((instance) => instance.findById(localAuthorityId)).returns(() => Promise.resolve(localAuthority));
        circleDao.setup(async (instance) => await instance.findById(updateCircleDTO.getId())).returns(() => Promise.resolve(circle));
        userDao.setup(async (instance) => await instance.findById(user.getId())).returns(() => Promise.resolve(user));

        await circleCommandService.updateCircle(updateCircleDTO);

        let circleFromDao: Circle = null;
        circleDao.verify((instance: CircleDao) => instance.saveOrUpdate(TypeMoq.It.is((circleToSave: Circle) => {
            circleFromDao = circleToSave;
            let ret: boolean = circleToSave.getName() === updateCircleDTO.getName();
            ret = ret && circleToSave.getRoles().length === updateCircleDTO.getRoles().length;
            for (let i = 0; i < updateCircleDTO.getRoles().length; i++) {
                ret = ret && circleToSave.getRoles()[i] === updateCircleDTO.getRoles()[i];
            }
            ret = ret && circleToSave.isDefaultCircle() === updateCircleDTO.isDefaultCircle();
            ret = ret && circleToSave.getId() === circle.getId();
            circleToSave.getUsers().then((value) => {
                ret = ret && value.length === updateCircleDTO.getMembers().length;
                for (let i = 0; i < updateCircleDTO.getMembers().length; i++) {
                    ret = ret && value[i].getId() === updateCircleDTO.getMembers()[i];
                }
            });
            return ret;
        })), TypeMoq.Times.exactly(1));

        const members = await circleFromDao.getUsers();
        Chai.assert.equal(members.length, updateCircleDTO.getMembers().length);
        for (let i = 0; i < updateCircleDTO.getMembers().length; i++) {
            Chai.assert.equal(members[i].getId(), updateCircleDTO.getMembers()[i]);

        }
    }

    @test
    private async testUpdateCircleCommandNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);

        await circleCommandService.updateCircle(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testUpdateCircleCommandUndefined() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);

        await circleCommandService.updateCircle(undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Command cannot be undefined or null");
        });
    }

    @test
    private async testUpdateCircleCommandIdNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(null);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's identifier cannot be undefined or null");
        });
    }

    @test
    private async testUpdateCircleCommandIdUndefined() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setId(undefined);
        circleCommandDTO.setDefaultCircle(true);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's identifier cannot be undefined or null");
        });
    }

    @test
    private async testUpdateCircleCommandNameNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(1);
        circleCommandDTO.setName(null);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateCircleCommandNameUndefined() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName(undefined);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateCircleCommandNameEmpty() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("");
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's name cannot be null or empty");
        });
    }

    @test
    private async testUpdateCircleCommandRoleNull() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles(null);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's roles cannot be null");
        });
    }

    @test
    private async testUpdateCircleLocalAuthorityNotFound() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setLocalAuthorityId(12);
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "LocalAuthority for id : '" + circleCommandDTO.getLocalAuthorityId() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircleCircleNotFound() {
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthority.setCredential(Promise.resolve(credential));
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setLocalAuthorityId(23);
        circleCommandDTO.setId(12);

        localAuthorityDao.setup((instance) => instance.findById(circleCommandDTO.getLocalAuthorityId())).returns(() => Promise.resolve(localAuthority));

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle with id '" + circleCommandDTO.getId() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircleCircleAndLocalAuthorityDoesntMatch() {
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        localAuthority.setId(123);
        const credential: Credential = new Credential();
        credential.setSecret("secret");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthority.setCredential(Promise.resolve(credential));

        const circle: Circle = new Circle();
        circle.setId(12);
        circle.setRoles(["READ_ALL"]);
        circle.setName("Jean de la tourette");
        circle.setDefaultCircle(true);
        circle.setLocalAuthority(Promise.resolve(new LocalAuthority()));

        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setLocalAuthorityId(23);
        circleCommandDTO.setId(12);

        localAuthorityDao.setup((instance) => instance.findById(circleCommandDTO.getLocalAuthorityId())).returns(() => Promise.resolve(localAuthority));
        circleDao.setup((instance) => instance.findById(circleCommandDTO.getId())).returns(() => Promise.resolve(circle));

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle '" + circle.getId() + "' and localAuthority '" + localAuthority.getId() + "'have to be linked ");
        });
    }

    @test
    private async testUpdateCircleUserDoesntExist() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const localAuthorityDao: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Rochelle");
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthority.setCredential(Promise.resolve(credential));

        const users: User[] = [];

        const user: User = new User();
        user.setId(42);
        user.setFirstName("romain");
        user.setLastName("rambal");
        user.setEmail("aa@aa.com");

        const circle: Circle = new Circle();
        circle.setId(1);
        circle.setRoles(["READ_ALL"]);
        circle.setName("Jean de la tourette");
        circle.setDefaultCircle(true);
        circle.setUsers(Promise.resolve(users));
        circle.setLocalAuthority(Promise.resolve(localAuthority));

        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDefaultCircle(true);
        circleCommandDTO.setId(circle.getId());
        circleCommandDTO.setMembers([0, 60, 1583211458]);

        localAuthorityDao.setup((instance) => instance.findById(circleCommandDTO.getLocalAuthorityId())).returns(() => Promise.resolve(localAuthority));
        circleDao.setup(async (instance) => await instance.findById(circleCommandDTO.getId())).returns(() => Promise.resolve(circle));
        userDao.setup(async (instance) => await instance.findById(user.getId())).returns(() => Promise.resolve(user));

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "User doesn't exist");
        });
    }

    @test
    private async testDeleteCircle(): Promise<void> {
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const circle: Circle = new Circle();
        circle.setId(1);
        circle.setRoles(["READ_ALL"]);
        circle.setName("Jean de la tourette");
        circle.setDefaultCircle(true);
        circle.setUsers(Promise.resolve([new User()]));

        //  /!\ IMPORTANT
        // / ! \ If you want to compare the same object (retrieve in DB and resend to DB for delete or update) you have to clone it
        ///__!__\ with Object.create({yourObject})
        circleDao.setup((instance) => instance.findById(circle.getId())).returns(() => Promise.resolve(Object.create(circle)));

        await circleCommandService.deleteCircle(circle.getId());

        circleDao.verify((instance: CircleDao) => instance.deleteCircle(TypeMoq.It.is((circleToDelete: Circle) => {
            let ret = circleToDelete.getName() === circle.getName();
            ret = ret && circleToDelete.getRoles().length === circle.getRoles().length;
            for (let i = 0; i < circleToDelete.getRoles().length; i++) {
                ret = ret && circleToDelete.getRoles()[i] === circle.getRoles()[i];
            }
            ret = ret && circleToDelete.isDefaultCircle() === circle.isDefaultCircle();
            ret = ret && circleToDelete.getId() === circle.getId();
            return ret;
        })), TypeMoq.Times.exactly(1));
    }

    @test
    private async testDeleteCircleCircleNotFound() {
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");
        const circleId: number = 1;

        await circleCommandService.deleteCircle(circleId).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle with id '" + circleId + "' cannot be found");
        });
    }
}
