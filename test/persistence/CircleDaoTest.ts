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

import { suite, test } from "mocha-typescript";
import * as Chai from "chai";
import { ContextApp } from "../ContextApp";
import * as TypeORM from "typeorm";
import { CircleDao} from "../../src/persistence/dao/CircleDao";
import { Circle } from "../../src/persistence/domain/Circle";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { Credential } from "../../src/persistence/domain/Credential";
import { AbstractTestDao } from "./inversify/AbstractTestDao";
import { FindCircleQuery } from "../../src/common/query/FindCircleQuery";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";

@suite
export class CircleDaoTest extends AbstractTestDao {

    @test
    public async testSaveOrUpdate(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleDao.saveOrUpdate(circle);

        const actual: Circle = await circleRepository.findOneById(circle.getId());

        Chai.assert.isTrue((await circleRepository.find()).length === 1);
        Chai.assert.equal(actual.getId(), circle.getId());
        Chai.assert.deepEqual(actual.getRoles(), circle.getRoles());
        Chai.assert.equal(actual.getName(), circle.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circle.isDefaultCircle());

    }

    @test
    public async testIsExists(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleRepository.save(circle);

        let isExists: boolean = await circleDao.exists(circle.getId());

        Chai.assert.isTrue(isExists);

        isExists = await circleDao.exists(circle.getId() + 2);

        Chai.assert.isFalse(isExists);
    }

    @test
    public async testFindBy(): Promise<void> {
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const numberOfCircles: number = 3;
        const localAuthorityId: number = 101;
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const localAuthorityDao: LocalAuthorityDao = ContextApp.container.get("LocalAuthorityDao");

        const circles: Circle[] = [];
        circles.push(new Circle());
        circles[0].setId(5);
        circles[0].setName("Bowman");
        circles[0].setRoles(["Muse of nanchos"]);
        circles[0].setDefaultCircle(false);
        circles.push(new Circle());
        circles[1].setId(20);
        circles[1].setName("C Ness is Sans");
        circles[1].setRoles(["Spooky skeleton"]);
        circles[1].setDefaultCircle(true);
        circles.push(new Circle());
        circles[2].setId(10);
        circles[2].setName("o");
        circles[2].setRoles(["Muse of nachos"]);
        circles[2].setDefaultCircle(false);

        const saveCircles: Promise<Circle[]> = circleRepository.save(circles);

        const localAuthorities: LocalAuthority[] = [];
        localAuthorities.push(new LocalAuthority());
        localAuthorities[0].setId(localAuthorityId);
        localAuthorities[0].setName("police");
        localAuthorities[0].setCircles(saveCircles);

        await saveCircles;
        await localAuthorityRepository.save(localAuthorities);

        const query: FindCircleQuery = new FindCircleQuery();
        query.setLocalAuthorityId(localAuthorityId);
        query.setLimit(numberOfCircles);
        query.setOffset(0);
        const actualCircles: Circle[] = await circleDao.findBy(query);
        const actualLocalAuthority: LocalAuthority = await localAuthorityDao.findById(localAuthorityId);

        Chai.assert.equal(actualLocalAuthority.getName(), localAuthorities[0].getName());
        for ( let i: number = 0; i < numberOfCircles; i++ ) {
            Chai.assert.equal(actualCircles[i].getId(), circles[i].getId());
            Chai.assert.equal(actualCircles[i].getName(), circles[i].getName());
            Chai.assert.deepEqual(actualCircles[i].getRoles(), circles[i].getRoles());
            Chai.assert.equal(actualCircles[i].isDefaultCircle(), circles[i].isDefaultCircle());
        }
    }

    @test
    public async testFindById(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setDefaultCircle(true);

        await circleRepository.save(circle);

        let actual: Circle = await circleDao.findById(circle.getId());

        Chai.assert.equal(actual.getId(), circle.getId());
        Chai.assert.deepEqual(actual.getRoles(), circle.getRoles());
        Chai.assert.equal(actual.getName(), circle.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circle.isDefaultCircle());

        actual = await circleDao.findById(circle.getId() + 2);

        Chai.assert.isTrue(actual === undefined);
    }

    @test
    public async testIsOwnedByLocalAuthority(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");
        const credentialRepository: TypeORM.Repository<Credential> = ContextApp.container.get("CredentialRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");

        const localAuthority: LocalAuthority = new LocalAuthority();
        localAuthority.setName("Stark Corp");

        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKey");
        await credentialRepository.save(credential);

        localAuthority.setCredential(Promise.resolve(credential));

        await localAuthorityRepository.save(localAuthority);

        const circle: Circle = new Circle();
        circle.setName("Michel");
        circle.setRoles(["Champion"]);
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        circle.setDefaultCircle(true);

        await circleRepository.save(circle);

        let isOwnedByLocalAuthority: boolean = await circleDao.isOwnedByLocalAuthority(circle.getId(), localAuthority.getId());

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, 1235);

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId(), 1235);

        Chai.assert.isFalse(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await circleDao.isOwnedByLocalAuthority(circle.getId() + 2, localAuthority.getId());

        Chai.assert.isFalse(isOwnedByLocalAuthority);
    }

    @test
    public async testDeleteCircle(): Promise<void> {
        const circleDao: CircleDao = ContextApp.container.get("CircleDao");
        const circleRepository: TypeORM.Repository<Circle> = ContextApp.container.get("CircleRepository");

        const circleToKeep: Circle = new Circle();
        circleToKeep.setName("MichelKeep");
        circleToKeep.setRoles(["ChampionKeep"]);
        circleToKeep.setDefaultCircle(false);

        const circleToDelete: Circle = new Circle();
        circleToDelete.setName("Michel");
        circleToDelete.setRoles(["Champion"]);
        circleToDelete.setDefaultCircle(true);

        await circleRepository.save(circleToDelete);
        await circleRepository.save(circleToKeep);
        const circleIdToDelete: number = circleToDelete.getId();
        const circleIdToKeep: number = circleToKeep.getId();

        let actual: Circle = await circleRepository.findOneById(circleIdToDelete);

        Chai.assert.isTrue(actual !== undefined);
        Chai.assert.equal(actual.getId(), circleToDelete.getId());
        Chai.assert.deepEqual(actual.getRoles(), circleToDelete.getRoles());
        Chai.assert.equal(actual.getName(), circleToDelete.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circleToDelete.isDefaultCircle());

        actual = await circleRepository.findOneById(circleIdToKeep);

        Chai.assert.isTrue(actual !== undefined);
        Chai.assert.equal(actual.getId(), circleToKeep.getId());
        Chai.assert.deepEqual(actual.getRoles(), circleToKeep.getRoles());
        Chai.assert.equal(actual.getName(), circleToKeep.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circleToKeep.isDefaultCircle());

        await circleDao.deleteCircle(circleToDelete);

        actual = await circleRepository.findOneById(circleIdToDelete);
        Chai.assert.isTrue(actual === undefined);

        actual = await circleRepository.findOneById(circleIdToKeep);

        Chai.assert.isTrue(actual !== undefined);
        Chai.assert.equal(actual.getId(), circleToKeep.getId());
        Chai.assert.deepEqual(actual.getRoles(), circleToKeep.getRoles());
        Chai.assert.equal(actual.getName(), circleToKeep.getName());
        Chai.assert.equal(actual.isDefaultCircle(), circleToKeep.isDefaultCircle());
    }
}
