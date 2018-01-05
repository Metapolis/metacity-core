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
import { suite, test } from "mocha-typescript";
import * as TypeMoq from "typemoq";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import * as Chai from "chai";
import { ContextApp } from "../../ContextApp";
import { DataSetDao } from "../../../src/persistence/dao/DataSetDao";
import { DataSetCommandService } from "../../../src/services/command/DataSetCommandService";
import { DataSet } from "../../../src/persistence/domain/DataSet";
import { DataType } from "../../../src/common/enum/DataType";
import { Role } from "../../../src/common/enum/Role";

/**
 * All test for circle command service
 */
@suite
class DataSetCommandServiceTest extends AbstractTestService {

    @test
    private async testUpdateDataSetRestriction(): Promise<void> {
        const dataSetId: number = 12;
        const dataSetDao: TypeMoq.IMock<DataSetDao> = (ContextApp.container.get("DataSetDaoMock") as TypeMoq.IMock<DataSetDao>);
        const dataSetCommandService: DataSetCommandService = ContextApp.container.get("DataSetCommandService");

        const dataSet: DataSet = new DataSet();
        dataSet.setName("Rochelle");
        dataSet.setRestricted(false);
        dataSet.setDescription("Description");
        dataSet.setDataType(DataType.TWEET);
        dataSet.setRoles([Role.MANAGE_LOCAL_AUTHORITY]);
        dataSet.setId(dataSetId);

        dataSetDao.setup((instance) => instance.findById(dataSetId)).returns(() => Promise.resolve(dataSet));

        await dataSetCommandService.updateRestrictedField(dataSetId, true);

        dataSetDao.verify((instance: DataSetDao) => instance.saveOrUpdate(TypeMoq.It.is((dataSetToSave: DataSet) => {
            let ret: boolean = dataSetToSave.getName() === dataSet.getName();
            ret = ret && dataSetToSave.getId() === dataSet.getId();
            ret = ret && dataSetToSave.getDescription() === dataSet.getDescription();
            ret = ret && dataSetToSave.getDataType() === dataSet.getDataType();
            ret = ret && dataSetToSave.getRoles().length === dataSet.getRoles().length;
            for (let i = 0; i < dataSetToSave.getRoles().length; i++) {
                ret = ret && dataSetToSave.getRoles()[i] === dataSet.getRoles()[i];
            }
            ret = ret && dataSetToSave.isRestricted() === true;

            return ret;
        })), TypeMoq.Times.exactly(1));
    }

    @test
    private async testUpdateDataSetRestrictedValueNull() {
        const dataSetCommandService: DataSetCommandService = (ContextApp.container.get("DataSetCommandService") as DataSetCommandService);

        await dataSetCommandService.updateRestrictedField(null, null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Restricted new value cannot be null or undefined");
        });
    }

    @test
    private async testUpdateDataSetRestrictedValueUndefined() {
        const dataSetCommandService: DataSetCommandService = (ContextApp.container.get("DataSetCommandService") as DataSetCommandService);

        await dataSetCommandService.updateRestrictedField(null, undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Restricted new value cannot be null or undefined");
        });
    }

    @test
    private async testUpdateDataSetRestrictedIdNull() {
        const dataSetCommandService: DataSetCommandService = (ContextApp.container.get("DataSetCommandService") as DataSetCommandService);

        await dataSetCommandService.updateRestrictedField(null, true).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Date set identifier  cannot be null or undefined");
        });
    }

    @test
    private async testUpdateDataSetRestrictedIdUndefined() {
        const dataSetCommandService: DataSetCommandService = (ContextApp.container.get("DataSetCommandService") as DataSetCommandService);

        await dataSetCommandService.updateRestrictedField(undefined, true).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Date set identifier  cannot be null or undefined");
        });
    }

    @test
    private async testUpdateDataSetRestrictedCannotFindDataSet() {
        const dataSetCommandService: DataSetCommandService = (ContextApp.container.get("DataSetCommandService") as DataSetCommandService);

        await dataSetCommandService.updateRestrictedField(2, true).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Data set cannot be find");
        });
    }
}
