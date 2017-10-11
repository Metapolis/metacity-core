import { AbstractTestService } from "../inversify/AbstractTestService";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import { ContextApp } from "../../ContextApp";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as TypeMoq from "typemoq";
import { CircleDTO } from "../../../src/services/query/dto/circle/CircleDTO";
import { Circle } from "../../../src/persistence/domain/Circle";
import { Role } from "../../../src/common/enum/Role";
import * as Chai from "chai";
import { User } from "../../../src/persistence/domain/User";

@suite
export class CircleQueryServiceTest extends AbstractTestService {

    @test
    private async testGetCircle(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        const usersMock: User[] = [];
        const user1: User = new User();
        user1.setId(14);
        user1.setFirstName("Tony");
        user1.setLastName("Stark");
        usersMock.push(user1);

        const user2: User = new User();
        user2.setId(15);
        user2.setFirstName("Tony");
        user2.setLastName("Stark");
        usersMock.push(user2);

        const circleMock: Circle = new Circle();
        circleMock.setId(12);
        circleMock.setName("Stark Company");
        circleMock.setDefaultCircle(true);
        circleMock.setRoles(["FAKE_ROLE", Role[Role.READ_ALL]]);
        circleMock.setUsers(Promise.resolve(usersMock));
        circleDaoMock.setup((instance) => instance.findById(12)).returns(() => Promise.resolve(circleMock));

        let circleDTO: CircleDTO = await circleQueryService.getCircle(12);

        Chai.assert.equal(circleDTO.getId(), circleMock.getId());
        Chai.assert.equal(circleDTO.isDefaultCircle(), circleMock.isDefaultCircle());
        Chai.assert.equal(circleDTO.getName(), circleMock.getName());
        Chai.assert.equal(circleDTO.getRoles().length, circleMock.getRoles().length - 1);
        for (let i = 0; i < circleDTO.getRoles().length; i = i + 1) {
            Chai.assert.equal(circleDTO.getRoles()[i], circleMock.getRoles()[i + 1]);
        }

        Chai.assert.equal(circleDTO.getMembers().length, usersMock.length);
        // FAKE ROLE is not role so we don't want to retrieve it in DTO
        for (let i = 0; i < circleDTO.getMembers().length; i = i + 1) {
            Chai.assert.equal(circleDTO.getMembers()[i].getId(), usersMock[i].getId());
            Chai.assert.equal(circleDTO.getMembers()[i].getFirstName(), usersMock[i].getFirstName());
            Chai.assert.equal(circleDTO.getMembers()[i].getLastName(), usersMock[i].getLastName());
        }

        circleDTO = await circleQueryService.getCircle(13);
        Chai.assert.isNull(circleDTO);
    }

    @test
    private async testIsOwnedByLocalAuthority(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        circleDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(12, 123)).returns(() => Promise.resolve(true));
        circleDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(10, 124)).returns(() => Promise.resolve(false));

        let isOwnedByLocalAuthority: boolean = await circleQueryService.isOwnedByLocalAuthority(12, 123);

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleQueryService.isOwnedByLocalAuthority(10, 124);

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
