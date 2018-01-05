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
import { FindCircleQuery } from "../../../src/common/query/FindCircleQuery";
import { FindUserQuery } from "../../../src/common/query/FindUserQuery";
import { isNullOrUndefined } from "util";
import { UserQueryService } from "../../../src/services/query/UserQueryService";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { DataSetQueryService } from "../../../src/services/query/DataSetQueryService";
import { DataSetDao } from "../../../src/persistence/dao/DataSetDao";
import { DataSet } from "../../../src/persistence/domain/DataSet";
import { FindDataSetQuery } from "../../../src/common/query/FindDataSetQuery";
import { DataSetDTO } from "../../../src/services/query/dto/data-set/DataSetDTO";

@suite
export class DataSetQueryServiceTest extends AbstractTestService {

    @test
    private async testFindDataSets(): Promise<void> {
        const numberOfDataSets: number = 2;
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);
        const dataSetDaoMock: TypeMoq.IMock<DataSetDao> = (ContextApp.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDao>);
        const dataSetsMock: DataSet[] = [];
        const localAuthorityId: number = 1;

        /** First DataSet */
        dataSetsMock.push(new DataSet());
        dataSetsMock[0].setId(4);
        dataSetsMock[0].setName("Roller coaster tycoon");
        dataSetsMock[0].setDescription("Il s'enjaille de fou");
        dataSetsMock[0].setRestricted(true);

        /** Another dataSet */
        dataSetsMock.push(new DataSet());
        dataSetsMock[1].setId(13);
        dataSetsMock[1].setName("memetic content, high energy, super male vitality");
        dataSetsMock[0].setDescription("Il ne s'enjaille de fou lui par contre");
        dataSetsMock[0].setRestricted(false);

        // update imaginary database ໒( ͡ᵔ ▾ ͡ᵔ )७
        const queryMock: FindDataSetQuery = new FindDataSetQuery();
        queryMock.setLimit(numberOfDataSets);
        queryMock.setOffset(0);
        dataSetDaoMock.setup((instance) => instance.findBy(TypeMoq.It.isAny()))
            .returns(() => Promise.resolve(dataSetsMock));

        /** O==||==assert=time==> */
        let dataSetsDTO: ResultList<DataSetDTO> = await dataSetQueryService.findDataSets(queryMock);
        for (let i: number = 0; i < numberOfDataSets; i++) {
            Chai.assert.equal(dataSetsDTO.results[i].getId(), dataSetsMock[i].getId());
            Chai.assert.equal(dataSetsDTO.results[i].isRestricted(), dataSetsMock[i].isRestricted());
            Chai.assert.equal(dataSetsDTO.results[i].getDescription(), dataSetsMock[i].getDescription());
            Chai.assert.equal(dataSetsDTO.results[i].getName(), dataSetsMock[i].getName());
        }

        dataSetDaoMock.verify((instance) => instance.findBy(TypeMoq.It.is((query: FindDataSetQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === false;
            ret = ret && isNullOrUndefined(query.getLocalAuthorityId());

            return ret;
        })), TypeMoq.Times.exactly(1));

        queryMock.setLocalAuthorityId(localAuthorityId);

        /** O==||==assert=time==> */
        dataSetsDTO = await dataSetQueryService.findDataSets(queryMock);
        for (let i: number = 0; i < numberOfDataSets; i++) {
            Chai.assert.equal(dataSetsDTO.results[i].getId(), dataSetsMock[i].getId());
            Chai.assert.equal(dataSetsDTO.results[i].isRestricted(), dataSetsMock[i].isRestricted());
            Chai.assert.equal(dataSetsDTO.results[i].getDescription(), dataSetsMock[i].getDescription());
            Chai.assert.equal(dataSetsDTO.results[i].getName(), dataSetsMock[i].getName());
        }

        dataSetDaoMock.verify((instance) => instance.findBy(TypeMoq.It.is((query: FindDataSetQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === true;
            ret = ret && query.getLocalAuthorityId() === localAuthorityId;

            return ret;
        })), TypeMoq.Times.exactly(1));
    }

    @test
    private async testFindDataSetsQueryNull() {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);

        await dataSetQueryService.findDataSets(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Query cannot be null");
        });
    }

    @test
    private async testFindDataSetsQueryOffsetNull() {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);

        const findDataSetsQuery: FindDataSetQuery = new FindDataSetQuery();
        findDataSetsQuery.setOffset(null);

        await dataSetQueryService.findDataSets(findDataSetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset must be set");
        });
    }

    @test
    private async testFindDataSetsQueryOffsetNegative() {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);

        const findDataSetsQuery: FindDataSetQuery = new FindDataSetQuery();
        findDataSetsQuery.setOffset(-1);

        await dataSetQueryService.findDataSets(findDataSetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset cannot be negative");
        });
    }

    @test
    private async testFindDataSetsQueryLimitNull() {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);

        const findDataSetsQuery: FindDataSetQuery = new FindDataSetQuery();
        findDataSetsQuery.setLimit(null);

        await dataSetQueryService.findDataSets(findDataSetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be set");
        });
    }

    @test
    private async testFindDataSetsQueryLimitZero() {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);

        const findDataSetsQuery: FindDataSetQuery = new FindDataSetQuery();
        findDataSetsQuery.setLimit(0);

        await dataSetQueryService.findDataSets(findDataSetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be superior to zero");
        });
    }

    @test
    private async testIsOwnedByLocalAuthority(): Promise<void> {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);
        const dataSetDaoMock: TypeMoq.IMock<DataSetDao> = (ContextApp.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDao>);

        dataSetDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(12, 123)).returns(() => Promise.resolve(true));
        dataSetDaoMock.setup((instance) => instance.isOwnedByLocalAuthority(10, 124)).returns(() => Promise.resolve(false));

        let isOwnedByLocalAuthority: boolean = await dataSetQueryService.isOwnedByLocalAuthority(12, 123);

        Chai.assert.isTrue(isOwnedByLocalAuthority);

        isOwnedByLocalAuthority = await dataSetQueryService.isOwnedByLocalAuthority(10, 124);

        Chai.assert.isFalse(isOwnedByLocalAuthority);
    }

    @test
    private async testIsExists(): Promise<void> {
        const dataSetQueryService: DataSetQueryService = (ContextApp.container.get("DataSetQueryService") as DataSetQueryService);
        const dataSetDaoMock: TypeMoq.IMock<DataSetDao> = (ContextApp.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDao>);

        dataSetDaoMock.setup((instance) => instance.isExists(12)).returns(() => Promise.resolve(true));
        dataSetDaoMock.setup((instance) => instance.isExists(10)).returns(() => Promise.resolve(false));

        let exists: boolean = await dataSetQueryService.isExists(12);

        Chai.assert.isTrue(exists);

        exists = await dataSetQueryService.isExists(10);

        Chai.assert.isFalse(exists);
    }
}
