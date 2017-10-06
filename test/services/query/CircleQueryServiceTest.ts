import { AbstractTestService } from "../inversify/AbstractTestService";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { ContextApp } from "../../ContextApp";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as TypeMoq from "typemoq";
import { CircleDTO } from "../../../src/services/query/dto/circle/CircleDTO";
import { ActivityCircle } from "../../../src/persistence/domain/ActivityCircle";
import { Role } from "../../../src/common/enum/Role";
import * as Chai from "chai";
import { User } from "../../../src/persistence/domain/User";

@suite
export class CircleQueryServiceTest extends AbstractTestService {

    @test
    private async testGetCircle(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        const user: User = new User();
        user.setId(14);

        const circleMock: ActivityCircle = new ActivityCircle();
        circleMock.setId(12);
        circleMock.setName("Stark Company");
        circleMock.setDescription("C'est bien une companie de malade !");
        circleMock.setAvatarUrl("https://i.pinimg.com/736x/2c/bb/04/2cbb04e7ef9266e1e57a9b0e75bc555f--iron-man-avengers-marvel-iron-man.jpg");
        circleMock.setRoles(["FAKE_ROLE", Role[Role.READ_ALL]]);
        (await circleMock.getUsers()).push(user);
        circleDaoMock.setup((instance) => instance.findById(12)).returns(() => Promise.resolve(circleMock));

        let circleDTO: CircleDTO = await circleQueryService.getCircle(12);

        Chai.assert.equal(circleDTO.getId(), circleMock.getId());
        Chai.assert.equal(circleDTO.getAvatarUrl(), circleMock.getAvatarUrl());
        Chai.assert.equal(circleDTO.getName(), circleMock.getName());
        Chai.assert.equal(circleDTO.getDescription(), circleMock.getDescription());

        Chai.assert.equal(circleDTO.getRoles().length, circleMock.getRoles().length - 1);
        for (let i = 0; i < circleDTO.getRoles().length; i = i + 1) {
            Chai.assert.equal(circleDTO.getRoles()[i], circleMock.getRoles()[i + 1]);
        }

        const users: User[] = await circleMock.getUsers();
        Chai.assert.equal(circleDTO.getMembers().length, users.length);
        // FAKE ROLE is not role so we don't want to retrieve it in DTO
        for (let i = 0; i < circleDTO.getMembers().length; i = i + 1) {
            Chai.assert.equal(circleDTO.getMembers()[i].getId(), users[i].getId());
            // TODO Wait add first and last name
            // Chai.assert.equal(circleDTO.getMembers()[i].getFirstName(), user[i].getFirstName());
            // Chai.assert.equal(circleDTO.getMembers()[i].getLastName(), user[i].getLastName());
        }

        circleDTO = await circleQueryService.getCircle(13);
        Chai.assert.isNull(circleDTO);
    }

    @test
    private async testIsOwnedByLocalAuthority(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        circleDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(12, "accesskey")).returns(() => Promise.resolve(true));
        circleDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(10, "accesskey12")).returns(() => Promise.resolve(false));

        let isOwnedByLocalAuthority: boolean = await circleQueryService.isOwnedByLocalAuthority(12, "accesskey");

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleQueryService.isOwnedByLocalAuthority(10, "accesskey12");

        Chai.assert.isFalse(isOwnedByLocalAuthority);
    }

    @test
    private async testExists(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        circleDaoMock.setup((instance) => instance.exists(12)).returns(() => Promise.resolve(true));
        circleDaoMock.setup((instance) => instance.exists(10)).returns(() => Promise.resolve(false));

        let exists: boolean = await circleQueryService.exists(12);

        Chai.assert.isTrue(exists);

        exists = await circleQueryService.exists(10);

        Chai.assert.isFalse(exists);
    }
}
