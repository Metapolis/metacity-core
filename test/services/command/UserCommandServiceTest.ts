import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { Client, GetParams } from "elasticsearch";
import * as Request from "request-promise";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import * as TypeMoq from "typemoq";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserCommandService } from "../../../src/services/command/UserCommandService";
import {SaveUserCommandDTO} from "../../../src/services/command/dto/users/SaveUserCommandDTO";
import {User} from "../../../src/persistence/domain/User";

@suite
class UserCommandServiceTest extends AbstractTestService {

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
}
