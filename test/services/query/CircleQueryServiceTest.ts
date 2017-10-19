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
        const circlesMock: Circle[] = [];

        /** Our current user */
        const userJhon = new User();
        userJhon.setId(13);

        /** First Circle */
        circlesMock.push(new Circle());
        circlesMock[0].setId(4);
        circlesMock[0].setName("Roller coaster tycoon");
        circlesMock[0].setDefaultCircle(true);
        // add users to the circle
        (await circlesMock[0].getUsers()).push(userJhon);

        /** Another circle */
        circlesMock.push(new Circle());
        circlesMock[1].setId(13);
        circlesMock[1].setName("memetic content, high energy, super male vitality");
        circlesMock[1].setDefaultCircle(false);
        // add users to the circle
        (await circlesMock[1].getUsers()).push(userJhon);

        // update imaginary database ໒( ͡ᵔ ▾ ͡ᵔ )७
        circleDaoMockOne.setup((instance) => instance.findAll())
            .returns(() => Promise.resolve(circlesMock));

        /** O==||==assert=time==> */
        const circlesDTO: CircleDTO[] = await circleQueryService.getCircles();
        for ( let i: number = 0; i<2; i++ ) {
            Chai.assert.equal(circlesDTO[i].getId(), circlesMock[i].getId());
            Chai.assert.equal(circlesDTO[i].isDefaultCircle(), circlesMock[i].isDefaultCircle());
            Chai.assert.equal(circlesDTO[i].getName(), circlesMock[i].getName());
        }
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
