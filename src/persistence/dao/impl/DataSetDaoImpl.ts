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

import { DataSetDao } from "../DataSetDao";
import { DataSet } from "../../domain/DataSet";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";
import { FindDataSetQuery } from "../../../common/query/FindDataSetQuery";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

/**
 * Implementation of {@link DataSetDao}
 */
@injectable()
export class DataSetDaoImpl implements DataSetDao {

    /**
     * DataSetDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(DataSetDaoImpl.name);

    /**
     * DataSet data access
     */
    @inject("DataSetRepository")
    private dataSetRepository: TypeORM.Repository<DataSet>;

    /**
     * Computes query used by {@link #countBy(FindDataSetQuery)} and {@link #findBy(FindDataSetQuery)}
     *
     * @param query query object
     *
     * @return TypeORM query
     */
    private computeQuery(query: FindDataSetQuery): SelectQueryBuilder<DataSet> {
        const queryBuilder: SelectQueryBuilder<DataSet> = this.dataSetRepository.createQueryBuilder("dataSet");
        if (query.isSet()) {
            if (query.getLocalAuthorityId() !== undefined) {
                queryBuilder
                    .innerJoinAndSelect("dataSet.localAuthority", "localAuthority")
                    .where("(localAuthority.id = :localAuthority)")
                    .setParameters({localAuthority: query.getLocalAuthorityId()});
            }
        }
        queryBuilder.orderBy("dataSet.name", "ASC");

        this.logger.debug("Computed query is : '%s'", queryBuilder.getSql());

        return queryBuilder;
    }

    /**
     * Override
     */
    public async findBy(query: FindDataSetQuery): Promise<DataSet[]> {
        const dataSets: DataSet[] = await this.computeQuery(query).offset(query.getOffset()).limit(query.getLimit()).getMany();

        this.logger.debug("'%s' dataSets retrieves", dataSets.length);

        return dataSets;
    }

    /**
     * Override
     */
    public async countBy(query: FindDataSetQuery): Promise<number> {
        return await this.computeQuery(query).getCount();
    }
}
