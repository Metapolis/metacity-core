
import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { Client, GetParams } from "elasticsearch";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import {  } from "../../src/persistence/domain/ActivityCircle";
import {isNullOrUndefined} from "util";
import {ActivityCircle} from "../../../src/persistence/domain/ActivityCircle";
import { SaveCircleCommandDTO } from "../../../src/services/command/dto/circles/SaveCircleCommandDTO";
import {IllegalArgumentError} from "../../../src/common/error/IllegalArgumentError";
import {CircleCommandService} from "../../../src/services/command/CircleCommandService";
import {Collectivity} from "../../../src/persistence/domain/Collectivity";
import {ObjectType} from "typeorm";
import {CircleDao} from "../../../src/persistence/dao/CircleDao";
import {CollectivityDao} from "../../../src/persistence/dao/CollectivityDao";

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
        const circleIdentifier: number = 42;
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

    }
