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

import { DataSetDTO } from "./dto/data-set/DataSetDTO";
import { ResultList } from "../../common/ResultList";
import { FindDataSetQuery } from "../../common/query/FindDataSetQuery";

/**
 * Contains method to perform data set query
 */
export interface DataSetQueryService {
    /**
     * Find list of data sets for a local authority
     *
     * @param {FindDataSetQuery} query contains dataSet search query
     * @returns {Promise<ResultList<DataSetDTO>>} DTOs of dataSets
     */
    findDataSets(query: FindDataSetQuery): Promise<ResultList<DataSetDTO>>;

    /**
     * Check if dataSet exists
     *
     * @param id dataSet's identifier
     *
     * @returns {Promise<boolean>} true means dataSet with this specific identifier exists
     */
    isExists(id: number): Promise<boolean>;

    /**
     * Check if dataSet is owned by localAuthority
     *
     * @param {number} dataSetId dataSet identifier
     * @param {number} localAuthorityId localAuthority identifier
     *
     * @returns {boolean} true means localAuthority own dataSet
     */
    isOwnedByLocalAuthority(dataSetId: number, localAuthorityId: number): Promise<boolean>;
}
