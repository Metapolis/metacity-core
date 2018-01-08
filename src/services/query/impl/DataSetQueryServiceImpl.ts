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

import { DataSetQueryService } from "../DataSetQueryService";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { DataSetDao } from "../../../persistence/dao/DataSetDao";
import { DataSet } from "../../../persistence/domain/DataSet";
import { DataSetDTO } from "../dto/data-set/DataSetDTO";
import { ResultList } from "../../../common/ResultList";
import { FindDataSetQuery } from "../../../common/query/FindDataSetQuery";
import { isNullOrUndefined } from "util";

/**
 * Implementation of {@link DataSetQueryService}
 */
@injectable()
export class DataSetQueryServiceImpl implements DataSetQueryService {

    /**
     * DataSetQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(DataSetQueryServiceImpl.name);

    /**
     * DataSet data access object
     */
    @inject("DataSetDao")
    private dataSetDao: DataSetDao;

    /**
     * Override
     */
    public async isExists(id: number): Promise<boolean> {
        this.logger.debug("Check if dataSet with id '%s' exists", id);

        return await this.dataSetDao.isExists(id);
    }

    /**
     * Override
     */
    public async isOwnedByLocalAuthority(dataSetId: number, localAuthorityId: number): Promise<boolean> {
        this.logger.debug("Check if dataSet '%s' is owned by localAuthority '%s'", dataSetId, localAuthorityId);
        return await this.dataSetDao.isOwnedByLocalAuthority(dataSetId, localAuthorityId);
    }
    
    /**
     * Override
     */
    public async findDataSets(query: FindDataSetQuery): Promise<ResultList<DataSetDTO>> {
        this.logger.debug("Retrieving dataSets");
        Utils.checkArgument(!isNullOrUndefined(query), "Query cannot be null");
        Utils.checkArgument(!isNullOrUndefined(query.getOffset()), "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(!isNullOrUndefined(query.getLimit()), "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        const dataSets: DataSet[] = await this.dataSetDao.findBy(query);
        const count: number = await this.dataSetDao.countBy(query);
        const dataSetDTOs: DataSetDTO[] = [];

        for (const dataSet of dataSets) {
            const dataSetDTO: DataSetDTO = new DataSetDTO();
            dataSetDTO.setId(dataSet.getId());
            dataSetDTO.setName(dataSet.getName());
            dataSetDTO.setDescription(dataSet.getDescription());
            dataSetDTO.setRestricted(dataSet.isRestricted());
            dataSetDTOs.push(dataSetDTO);
        }

        return new ResultList<DataSetDTO>(count, dataSetDTOs);
    }
}
