
import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { Client, GetParams } from "elasticsearch";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../../../src/ContextApp";
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

/**
 * All test for user collectivity query service
 */

@suite
class CircleCommandServiceTest extends AbstractTestService {

    @test
    private async testCreateCircle(): Promise<void> {

        const accessKey: string = "starkindustries";
        const circleIdentifier: number = 42;
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);

        const saveCircleDTO: SaveCircleCommandDTO = new SaveCircleCommandDTO();
        saveCircleDTO.setAccessKey(accessKey);
        saveCircleDTO.setAvatarURL("avatarUrl");
        saveCircleDTO.setRoles(["Role"]);
        saveCircleDTO.setName("michel");
        saveCircleDTO.setDescription("description");

        circleCommandService.setup((instance: CircleCommandService) => instance.createCircle(TypeMoq.It.is((collectivityCircle: SaveCircleCommandDTO) => {
            let ret = collectivityCircle.getDescription() === saveCircleDTO.getDescription();
            ret = ret && collectivityCircle.getRoles().length === saveCircleDTO.getRoles().length;
            for (let i = 0; i < saveCircleDTO.getRoles().length; i++) {
                ret = ret && collectivityCircle.getRoles()[i] === saveCircleDTO.getRoles()[i];
            }
            ret = ret && collectivityCircle.getName() === saveCircleDTO.getName();
            ret = ret && collectivityCircle.getAvatarURL() === saveCircleDTO.getAvatarURL();
            ret = ret && collectivityCircle.getAccessKey() === accessKey;
            return ret;
        }))).returns(() => Promise.resolve(circleIdentifier));


    }
}
