import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { Client, GetParams } from "elasticsearch";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserCommandService } from "../../../src/services/command/UserCommandService";
import { SaveUserCommandDTO } from "../../../src/services/command/dto/user/SaveUserCommandDTO";
import {User} from "../../../src/persistence/domain/User";
import { IllegalArgumentError} from "../../../src/common/error/IllegalArgumentError";

/**
 * All tests for user command service
 */
@suite
class UserCommandServiceTest extends AbstractTestService {

    /**
     * Test function create user
     */
    @test
    private async testCreateUser(): Promise<void> {

        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);
        const userCommandService: UserCommandService = ContextApp.container.get("UserCommandService");

        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setEmail("john@cena");
        userDTO.setPassword("password");
        userDTO.setUsername("michel");
        userDTO.setAvatarURL("avatar");
        userDTO.setAddress("address");

        await userCommandService.createUser(userDTO);

        userDao.verify((instance: UserDao) => instance.saveOrUpdate(TypeMoq.It.is((user: User) => {
            let ret = user.getUsername() === userDTO.getUsername();
            ret = ret && user.getEmail() === userDTO.getEmail();
            ret = ret && user.getPassword() === userDTO.getPassword();
            ret = ret && user.getAvatarURL() === userDTO.getAvatarURL();
            ret = ret && user.getAddress() === userDTO.getAddress();
            return ret;
        })), TypeMoq.Times.exactly(1));
    }
    @test
    private async testCreateUserCommandNull() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);

        await userCommandService.createUser(null).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Command cannot be undefined or null");

        });

    }
    @test
    private async testCreateUserCommandUndefined() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);

        await userCommandService.createUser(undefined).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Command cannot be undefined or null");

        });

    }
    @test
    private async testCreateUserCommandUsernameNull() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername(null);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Username cannot be null or empty");

        });

    }
    @test
    private async testCreateUserCommandUsernameUndefined() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername(undefined);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Username cannot be null or empty");

        });

    }
    @test
    private async testCreateUserCommandPasswordNull() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername("michel");
        userDTO.setPassword(null);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Password cannot be null or empty");

        });

    }
    @test
    private async testCreateUserCommandPasswordUndefined() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername("michel");
        userDTO.setPassword(undefined);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Password cannot be null or empty");

        });

    }
    @test
    private async testCreateUserCommandEmailNull() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername("michel");
        userDTO.setPassword("bresil");
        userDTO.setEmail(null);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Email cannot be null or empty");

        });

    }
    @test
    private async testCreateUserCommandEmailUndefined() {

        const userCommandService: UserCommandService = (ContextApp.container.get("UserCommandService") as UserCommandService);
        const userDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        userDTO.setUsername("michel");
        userDTO.setPassword("bresil");
        userDTO.setEmail(undefined);
        await userCommandService.createUser(userDTO).then((result) => {

            throw Error("Illegal argument error expected");

        }, (err) => {

            Chai.assert.instanceOf(err, IllegalArgumentError);

            Chai.assert.equal(err.message, "Email cannot be null or empty");

        });

    }
}
