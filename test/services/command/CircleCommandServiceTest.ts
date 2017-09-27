import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import { ActivityCircle } from "../../../src/persistence/domain/ActivityCircle";
import { SaveCircleCommandDTO } from "../../../src/services/command/dto/circles/SaveCircleCommandDTO";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { Collectivity } from "../../../src/persistence/domain/Collectivity";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { CollectivityDao } from "../../../src/persistence/dao/CollectivityDao";
import { User } from "../../../src/persistence/domain/User";
import { UpdateCircleCommandDTO } from "../../../src/services/command/dto/circles/UpdateCircleCommandDTO";

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
        const accessKey: string = "starkindustries";
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const collectivityDao: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setSecret("secret");
        collectivity.setName("Rochelle");
        collectivity.setId(accessKey);

        const saveCircleDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleDTO.setAccessKey(accessKey);
        saveCircleDTO.setAvatarURL("avatarUrl");
        saveCircleDTO.setRoles(["Role"]);
        saveCircleDTO.setName("michel");
        saveCircleDTO.setDescription("description");

        collectivityDao.setup((instance) => instance.findById(accessKey)).returns(() => Promise.resolve(collectivity));

        await circleCommandService.createCircle(saveCircleDTO);

        circleDao.verify((instance: CircleDao) => instance.saveOrUpdate(TypeMoq.It.is((activityCircle: ActivityCircle) => {
            let ret = activityCircle.getName() === saveCircleDTO.getName();
            ret = ret && activityCircle.getRoles().length === saveCircleDTO.getRoles().length;
            for (let i = 0; i < saveCircleDTO.getRoles().length; i++) {
                ret = ret && activityCircle.getRoles()[i] === saveCircleDTO.getRoles()[i];
            }
            ret = ret && activityCircle.getDescription() === saveCircleDTO.getDescription();
            ret = ret && activityCircle.getAvatarUrl() === saveCircleDTO.getAvatarURL();
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
    private async testCreateCircleCommandNameNull() {

        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");


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
        circleCommandDTO.setDescription("bla");


        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's roles cannot be null");
        });
    }

    @test
    private async testCreateCircleCollectivityNotFound() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setAccessKey("AccessKeyDesFamilles");
        circleCommandDTO.setDescription("bla");

        await circleCommandService.createCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Collectivity for access key : '" + circleCommandDTO.getAccessKey() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircle(): Promise<void> {
        const accessKey: string = "starkindustries";
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const collectivityDao: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setSecret("secret");
        collectivity.setName("Rochelle");
        collectivity.setId(accessKey);

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setId(1);
        activityCircle.setRoles(["READ_ALL"]);
        activityCircle.setName("Jean de la tourette");
        activityCircle.setDescription("Pour une fois qu'on me permet de m'exprimer");
        activityCircle.setAvatarUrl(null);
        activityCircle.setUsers(Promise.resolve([new User()]));
        activityCircle.setCollectivity(Promise.resolve(collectivity));

        const updateCircleDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        updateCircleDTO.setAccessKey(accessKey);
        updateCircleDTO.setAvatarURL("avatarUrl");
        updateCircleDTO.setRoles(["Role"]);
        updateCircleDTO.setName("michel");
        updateCircleDTO.setDescription("description");
        updateCircleDTO.setId(activityCircle.getId());

        collectivityDao.setup((instance) => instance.findById(accessKey)).returns(() => Promise.resolve(collectivity));
        circleDao.setup((instance) => instance.findById(updateCircleDTO.getId())).returns(() => Promise.resolve(activityCircle));

        await circleCommandService.updateCircle(updateCircleDTO);

        circleDao.verify((instance: CircleDao) => instance.saveOrUpdate(TypeMoq.It.is((activityCircleToSave: ActivityCircle) => {
            let ret = activityCircleToSave.getName() === updateCircleDTO.getName();
            ret = ret && activityCircleToSave.getRoles().length === updateCircleDTO.getRoles().length;
            for (let i = 0; i < updateCircleDTO.getRoles().length; i++) {
                ret = ret && activityCircleToSave.getRoles()[i] === updateCircleDTO.getRoles()[i];
            }
            ret = ret && activityCircleToSave.getDescription() === updateCircleDTO.getDescription();
            ret = ret && activityCircleToSave.getAvatarUrl() === updateCircleDTO.getAvatarURL();
            ret = ret && activityCircleToSave.getId() === activityCircle.getId();
            return ret;
        })), TypeMoq.Times.exactly(1));
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
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");


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
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");
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
        circleCommandDTO.setDescription("bla");
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle's roles cannot be null");
        });
    }

    @test
    private async testUpdateCircleCollectivityNotFound() {
        const circleCommandService: CircleCommandService = (ContextApp.container.get("CircleCommandService") as CircleCommandService);
        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDescription("bla");
        circleCommandDTO.setAccessKey("AccessKeyDesFamilles");
        circleCommandDTO.setId(1);

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Collectivity for access key : '" + circleCommandDTO.getAccessKey() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircleCircleNotFound() {
        const collectivityDao: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setSecret("secret");
        collectivity.setName("Rochelle");
        collectivity.setId("AccessKeyDesFamilles");

        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDescription("bla");
        circleCommandDTO.setAccessKey("AccessKeyDesFamilles");
        circleCommandDTO.setId(12);

        collectivityDao.setup((instance) => instance.findById(circleCommandDTO.getAccessKey())).returns(() => Promise.resolve(collectivity));

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle with id '" + circleCommandDTO.getId() + "' cannot be found");
        });
    }

    @test
    private async testUpdateCircleCircleAndCollectivityDoesntMatch() {
        const collectivityDao: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const circleDao: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const circleCommandService: CircleCommandService = ContextApp.container.get("CircleCommandService");

        const collectivity: Collectivity = new Collectivity();
        collectivity.setSecret("secret");
        collectivity.setName("Rochelle");
        collectivity.setId("AccessKeyDesFamilles");

        const activityCircle: ActivityCircle = new ActivityCircle();
        activityCircle.setId(12);
        activityCircle.setRoles(["READ_ALL"]);
        activityCircle.setName("Jean de la tourette");
        activityCircle.setDescription("Pour une fois qu'on me permet de m'exprimer");
        activityCircle.setAvatarUrl(null);
        activityCircle.setCollectivity(Promise.resolve(new Collectivity()));

        const circleCommandDTO: UpdateCircleCommandDTO = new UpdateCircleCommandDTO();
        circleCommandDTO.setName("michel");
        circleCommandDTO.setRoles([]);
        circleCommandDTO.setDescription("bla");
        circleCommandDTO.setAccessKey("AccessKeyDesFamilles");
        circleCommandDTO.setId(12);

        collectivityDao.setup((instance) => instance.findById(circleCommandDTO.getAccessKey())).returns(() => Promise.resolve(collectivity));
        circleDao.setup((instance) => instance.findById(circleCommandDTO.getId())).returns(() => Promise.resolve(activityCircle));

        await circleCommandService.updateCircle(circleCommandDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Circle '" + activityCircle.getId() + "' and collectivity '" + collectivity.getId() + "'have to be linked ");
        });
    }
}
