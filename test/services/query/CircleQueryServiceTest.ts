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

        const user: User = new User();
        user.setId(14);

        const circleMock: Circle = new Circle();
        circleMock.setId(12);
        circleMock.setName("Stark Company");
        circleMock.setDefaultCircle(true);
        circleMock.setRoles(["FAKE_ROLE", Role[Role.READ_ALL]]);
        (await circleMock.getUsers()).push(user);
        circleDaoMock.setup((instance) => instance.findById(12)).returns(() => Promise.resolve(circleMock));

        let circleDTO: CircleDTO = await circleQueryService.getCircle(12);

        Chai.assert.equal(circleDTO.getId(), circleMock.getId());
        Chai.assert.equal(circleDTO.isDefaultCircle(), circleMock.isDefaultCircle());
        Chai.assert.equal(circleDTO.getName(), circleMock.getName());
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
    private async testGetCircles(): Promise<void> {
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMockOne: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
        const circleDaoMockTwo: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);

        /** Our current user */
        const userJhon = new User();
        userJhon.setId(13);

        /** First Circle */
        const circleMockOne: Circle = new Circle();
        circleMockOne.setId(4);
        circleMockOne.setName("Roller coaster tycoon");
        circleMockOne.setDefaultCircle(true);
        circleMockOne.setRoles(["FAKE_ROLE", Role[Role.READ_ALL]]);
        // add user to the circle
        const usersOfCircleMockOne: User[] = await circleMockOne.getUsers();
        usersOfCircleMockOne.push(userJhon);
        // update imaginary database ໒( ͡ᵔ ▾ ͡ᵔ )७
        circleDaoMockOne.setup((instance) => instance.findById(4))
            .returns(() => Promise.resolve(circleMockOne));

        /** Another circle */
        const circleMockTwo: Circle = new Circle();
        circleMockTwo.setId(13);
        circleMockTwo.setName("memetic content, high energy, super male vitality");
        circleMockTwo.setDefaultCircle(false);
        circleMockTwo.setRoles(["FAKE_ROLE", Role[Role.READ_ALL]]);
        // add user to the circle
        const usersOfCircleMockTwo: User[] = await circleMockOne.getUsers();
        usersOfCircleMockOne.push(userJhon);
        // update imaginary database ໒( ͡ᵔ ▾ ͡ᵔ )७
        circleDaoMockTwo.setup((instance) => instance.findById(13))
            .returns(() => Promise.resolve(circleMockTwo));

        /** O==||==assert=time==> */
        const circlesDTO: CircleDTO[] = await circleQueryService.getCircles();
        Chai.assert.equal(circlesDTO[0].getId(), circleMockOne.getId());
        Chai.assert.equal(circlesDTO[0].isDefaultCircle(), circleMockOne.isDefaultCircle());
        Chai.assert.equal(circlesDTO[0].getName(), circleMockOne.getName());
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
