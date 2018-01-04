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
import { DataSetDao } from "../../src/persistence/dao/DataSetDao";
import { DataSet } from "../../src/persistence/domain/DataSet";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { Credential } from "../../src/persistence/domain/Credential";
import { Role } from "../../src/common/enum/Role";
import { AbstractTestDao } from "./inversify/AbstractTestDao";
import { FindDataSetQuery } from "../../src/common/query/FindDataSetQuery";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { DataType } from "../../src/common/enum/DataType";

@suite
export class DataSetDaoTest extends AbstractTestDao {

    @test
    public async testFindBy(): Promise<void> {
        const dataSetRepository: TypeORM.Repository<DataSet> = ContextApp.container.get("DataSetRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const localAuthorityId: number = 101;
        const dataSetDao: DataSetDao = ContextApp.container.get("DataSetDao");

        const dataSets: DataSet[] = [];
        dataSets.push(new DataSet());
        dataSets[0].setName("Bowman");
        dataSets[0].setDescription("Bowman Desc");
        dataSets[0].setRoles(["Muse of nanchos"]);
        dataSets[0].setDataType(DataType.ACCIDENT);
        dataSets[0].setRestricted(false);
        dataSets.push(new DataSet());
        dataSets[1].setName("C Ness is Sans");
        dataSets[1].setDescription("C Ness is Sans desc");
        dataSets[1].setDataType(DataType.ACCIDENT);
        dataSets[1].setRoles(["Spooky skeleton"]);
        dataSets[1].setRestricted(true);
        dataSets.push(new DataSet());
        dataSets[2].setName("o");
        dataSets[2].setDescription("o desc");
        dataSets[2].setDataType(DataType.ACCIDENT);
        dataSets[2].setRoles(["Muse of nachos"]);
        dataSets[2].setRestricted(false);

        const saveDataSets: DataSet[] = await dataSetRepository.save(dataSets);

        const localAuthorities: LocalAuthority[] = [];
        localAuthorities.push(new LocalAuthority());
        localAuthorities[0].setId(localAuthorityId);
        localAuthorities[0].setName("police");
        (await localAuthorities[0].getDataSets()).push(saveDataSets[0], saveDataSets[1]);

        await localAuthorityRepository.save(localAuthorities);

        const query: FindDataSetQuery = new FindDataSetQuery();
        query.setLocalAuthorityId(localAuthorityId);
        query.setLimit(3);
        query.setOffset(0);
        let actualDataSets: DataSet[] = await dataSetDao.findBy(query);

        Chai.assert.equal(actualDataSets.length, 2);
        for (let i: number = 0; i < 2; i++) {
            Chai.assert.equal(actualDataSets[i].getId(), dataSets[i].getId());
            Chai.assert.equal(actualDataSets[i].getName(), dataSets[i].getName());
            Chai.assert.equal(actualDataSets[i].getDescription(), dataSets[i].getDescription());
            Chai.assert.equal(actualDataSets[i].getDataType(), dataSets[i].getDataType());
            Chai.assert.deepEqual(actualDataSets[i].getRoles(), dataSets[i].getRoles());
            Chai.assert.equal(actualDataSets[i].isRestricted(), dataSets[i].isRestricted());
        }

        query.setLocalAuthorityId(undefined);
        actualDataSets = await dataSetDao.findBy(query);

        Chai.assert.equal(actualDataSets.length, 3);
        for (let i: number = 0; i < 3; i++) {
            Chai.assert.equal(actualDataSets[i].getId(), dataSets[i].getId());
            Chai.assert.equal(actualDataSets[i].getName(), dataSets[i].getName());
            Chai.assert.equal(actualDataSets[i].getDescription(), dataSets[i].getDescription());
            Chai.assert.equal(actualDataSets[i].getDataType(), dataSets[i].getDataType());
            Chai.assert.deepEqual(actualDataSets[i].getRoles(), dataSets[i].getRoles());
            Chai.assert.equal(actualDataSets[i].isRestricted(), dataSets[i].isRestricted());
        }

        query.setLocalAuthorityId(4);
        actualDataSets = await dataSetDao.findBy(query);
        Chai.assert.equal(actualDataSets.length, 0);
    }

    @test
    public async testCountBy(): Promise<void> {
        const dataSetRepository: TypeORM.Repository<DataSet> = ContextApp.container.get("DataSetRepository");
        const localAuthorityRepository: TypeORM.Repository<LocalAuthority> = ContextApp.container.get("LocalAuthorityRepository");
        const localAuthorityId: number = 101;
        const dataSetDao: DataSetDao = ContextApp.container.get("DataSetDao");

        const dataSets: DataSet[] = [];
        dataSets.push(new DataSet());
        dataSets[0].setName("Bowman");
        dataSets[0].setDescription("Bowman Desc");
        dataSets[0].setRoles(["Muse of nanchos"]);
        dataSets[0].setDataType(DataType.ACCIDENT);
        dataSets[0].setRestricted(false);
        dataSets.push(new DataSet());
        dataSets[1].setName("C Ness is Sans");
        dataSets[1].setDescription("C Ness is Sans desc");
        dataSets[1].setDataType(DataType.ACCIDENT);
        dataSets[1].setRoles(["Spooky skeleton"]);
        dataSets[1].setRestricted(true);
        dataSets.push(new DataSet());
        dataSets[2].setName("o");
        dataSets[2].setDescription("o desc");
        dataSets[2].setDataType(DataType.ACCIDENT);
        dataSets[2].setRoles(["Muse of nachos"]);
        dataSets[2].setRestricted(false);

        const saveDataSets: DataSet[] = await dataSetRepository.save(dataSets);

        const localAuthorities: LocalAuthority[] = [];
        localAuthorities.push(new LocalAuthority());
        localAuthorities[0].setId(localAuthorityId);
        localAuthorities[0].setName("police");
        (await localAuthorities[0].getDataSets()).push(saveDataSets[0], saveDataSets[1]);

        await localAuthorityRepository.save(localAuthorities);

        const query: FindDataSetQuery = new FindDataSetQuery();
        query.setLocalAuthorityId(localAuthorityId);
        let count: number = await dataSetDao.countBy(query);

        Chai.assert.equal(count, 2);

        query.setLocalAuthorityId(undefined);
        count = await dataSetDao.countBy(query);

        Chai.assert.equal(count, 3);

        query.setLocalAuthorityId(4);
        count = await dataSetDao.countBy(query);
        Chai.assert.equal(count, 0);
    }
}
