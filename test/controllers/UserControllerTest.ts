import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import { UserCommandService } from "../../src/services/command/UserCommandService";
import { SaveUserCommandDTO } from "../../src/services/command/dto/users/SaveUserCommandDTO";
import { SaveUser } from "../../src/controllers/rest/model/user/SaveUser";
import {  } from "../../src/persistence/domain/ActivityCircle";
import {NumberIdentifier} from "../../src/controllers/rest/model/common/NumberIdentifier";
import {Labeled} from "../../src/common/Labeled";
import {isNullOrUndefined} from "util";
import {IllegalArgumentError} from "../../src/common/error/IllegalArgumentError";

/**
 * All test for user creation
 */
@suite
export class UserControllerTest extends AbstractTestController {

    /**
     * Test function create user
     */
    @test
    public async testCreateUser(): Promise<void> {

        const path: string = "/api/users";
        const userCommandService: TypeMoq.IMock<UserCommandService> = (ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>);
        // Hello im a rigid linter
        const userIdentifier = 42;

        const user: SaveUser = new SaveUser();
        user.username = "michel";
        user.address = "Maison";
        user.email = "john@cena";
        user.avatarURL = "Pour vendre des velux";
        user.password = "Monique";

        userCommandService.setup((instance: UserCommandService) => instance.createUser(TypeMoq.It.is((userDTO: SaveUserCommandDTO) => {
            let ret = userDTO.getUsername() === user.username;
            console.log(ret);
            ret = ret && userDTO.getEmail() === user.email;
            ret = ret && userDTO.getAvatarURL() === user.avatarURL;
            ret = ret && userDTO.getPassword() === user.password;
            ret = ret && userDTO.getAddress() === user.address;
            return ret;
        }))).returns(() => Promise.resolve(userIdentifier));

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        const actual: NumberIdentifier = new NumberIdentifier(0);
        await Request(opts).then((data: Labeled) => {
            console.log(data);
            Object.assign(actual, data);

        });

        console.log(actual);
        Chai.assert.equal(actual.identifier, userIdentifier, "Expected same identifier");

    }
    @test
    public async testCreateUserError(): Promise<void> {
        // 400 bad request => name or role is null or undefined
        // 403 not enough rights => role is not high enough to create a circle
        const path: string = "/api/users";
        const userCommandService: TypeMoq.IMock<UserCommandService> = (ContextApp.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>);

        const user: SaveUser = new SaveUser();
        user.username = "michel";
        user.password = "Champion";
        user.email = "john@cena";

        const opts = {
            method: "POST",
            uri: AbstractTestController.getBackend() + path,
            body: user,
            json: true
        };

        userCommandService.setup((instance) => instance.createUser(TypeMoq.It.isAny())).throws(new IllegalArgumentError("ERROR"));

        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }
}
