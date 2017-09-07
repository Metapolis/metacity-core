/*
import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { Client, GetParams } from "elasticsearch";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp} from "../../../src/ContextApp";
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

/!**
 * All test for user collectivity query service
 *!/
// @suite
class CircleCommandServiceTest extends AbstractTestService {

    // @test
    private async testCreateCircle(): Promise<void> {
        // test if circle is saved in Dao
        // test if circle id is correct
        // test if collectivity exists
        // verify parameters name and role

        const accessKey: string = "starkindustries";
        const circleIdentifier: number = 1;
        const collectivity: Collectivity = new Collectivity();
        const circleCommandService: TypeMoq.IMock<CircleCommandService> = (ContextApp.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>);
        const esClient: TypeMoq.IMock<Client> = (ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>);

        const circle: ActivityCircle = new ActivityCircle();
        circle.setName("Michel");
        circle.setId(1);
        circle.setRoles(["Champion"]);
        circle.setCollectivity(collectivity);

        esClient.verify((instance) => instance.search(TypeMoq.It.is((getParams: GetParams) => {
        let ret: boolean = getParams.type ==== ObjectType
        }

        circleCommandService.setup((instance: CircleCommandService) => instance.createCircle(TypeMoq.It.is((collectivityCircle: SaveCircleCommandDTO) => {
            let ret = collectivityCircle.getName() === circle.getName();
            for (let i = 0; i < circle.getRoles().length; i++) {
                ret = ret && collectivityCircle.getRoles()[i] === circle.getRoles()[i];
            }
            ret = ret && collectivityCircle.getAccessKey() === accessKey;
            return ret;
        }))).returns(() => Promise.resolve(circleIdentifier);

    }
}
*/
