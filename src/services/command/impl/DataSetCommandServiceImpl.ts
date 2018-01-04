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

import { DataSetCommandService } from "../DataSetCommandService";
import { inject, injectable } from "inversify";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { DataSetDao } from "../../../persistence/dao/DataSetDao";
import { DataSet } from "../../../persistence/domain/DataSet";
import { isNullOrUndefined } from "util";

/**
 * Implementation of {@link DataSetCommandService}
 */
@injectable()
export class DataSetCommandServiceImpl implements DataSetCommandService {

    /**
     * DataSetCommandServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(DataSetCommandServiceImpl.name);

    /**
     * DataSet data access object
     */
    @inject("DataSetDao")
    private dataSetDao: DataSetDao;

    /**
     * Override
     */
    public async updateRestrictedField(value: boolean, dataSetId: number): Promise<void> {
        this.logger.debug("Begin update restricted field for data set '%d'", dataSetId);
        Utils.checkArgument(!isNullOrUndefined(value), "Restricted new value cannot be null or undefined");
        Utils.checkArgument(!isNullOrUndefined(dataSetId), "Date set identifier  cannot be null or undefined");

        const dataSet: DataSet = await this.dataSetDao.findById(dataSetId);
        Utils.checkArgument(!isNullOrUndefined(dataSet), "Data set cannot be find");

        dataSet.setRestricted(value);

        await this.dataSetDao.saveOrUpdate(dataSet);

        this.logger.debug("Data set '%d' updated", dataSetId);
    }
}
