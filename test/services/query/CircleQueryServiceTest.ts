/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

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
import { ResultList } from "../../../src/common/ResultList";

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
    private async testGetCircles(): Promise<void> {
        const numberOfCircles: number = 2;
        const circleQueryService: CircleQueryService = (ContextApp.container.get("CircleQueryService") as CircleQueryService);
        const circleDaoMock: TypeMoq.IMock<CircleDao> = (ContextApp.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>);
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
        circleDaoMock.setup((instance) => instance.findAll())
            .returns(() => Promise.resolve(circlesMock));

        /** O==||==assert=time==> */
        const circlesDTO: ResultList<CircleDTO> = await circleQueryService.getCircles();
        for ( let i: number = 0; i < numberOfCircles; i++ ) {
            Chai.assert.equal(circlesDTO.results[i].getId(), circlesMock[i].getId());
            Chai.assert.equal(circlesDTO.results[i].isDefaultCircle(), circlesMock[i].isDefaultCircle());
            Chai.assert.equal(circlesDTO.results[i].getName(), circlesMock[i].getName());
        }
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
