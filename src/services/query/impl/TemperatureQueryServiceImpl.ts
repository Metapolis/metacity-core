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

import { TemperatureQueryService } from "../TemperatureQueryService";
import { inject, injectable } from "inversify";
import { FindTemperatureQuery } from "../../../common/query/FindTemperatureQuery";
import { ResultList } from "../../../common/ResultList";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { InfluxDB } from "influx";
import { TemperatureDTO } from "../dto/temperature/TemperatureDTO";
import { TemperatureMeasurement } from "../../../common/model/influxdb/measurement/TemperatureMeasurement";

/**
 * Implementation of {@link TemperatureQueryService}
 *
 * /!\ Service sample for influx db connection
 */
@injectable()
export class TemperatureQueryServiceImpl implements TemperatureQueryService {

    /**
     * TemperatureQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TemperatureQueryServiceImpl.name);

    /**
     * Temperature querying service
     */
    @inject("InfluxDBClient")
    private influxDBClient: InfluxDB;

    /**
     * Override
     *
     * @param query
     */
    public async findTemperatures(query: FindTemperatureQuery): Promise<ResultList<TemperatureDTO>> {
        this.logger.info("Retrieve temperatures in influxdb");
        Utils.checkArgument(query != null, "Query cannot be null");
        Utils.checkArgument(query.getOffset() != null, "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(query.getLimit() != null, "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        // Call influx with query
        const temperatureMeasurements = await this.influxDBClient.query<TemperatureMeasurement>(`Select * from temperature order by time desc limit ${query.getLimit()} offset ${query.getLimit() * query.getOffset()}`);
        const count = (await this.influxDBClient.query<{ count_temperature: number }>("Select count(*) from temperature"))[0] as { count_temperature: number };

        // Parse result to DTO
        // TODO create document object with public field to simple parse the json from ElasticSearch
        const temperatures: TemperatureDTO[] = [];
        for (const temperatureMeasurement of temperatureMeasurements) {
            const temperatureDTO: TemperatureDTO = new TemperatureDTO();
            temperatureDTO.setId(temperatureMeasurement.id);
            temperatureDTO.setTown(temperatureMeasurement.town);
            temperatureDTO.setValue(temperatureMeasurement.temperature);
            temperatures.push(temperatureDTO);
        }

        return new ResultList<TemperatureDTO>(count.count_temperature, temperatures);
    }
}
