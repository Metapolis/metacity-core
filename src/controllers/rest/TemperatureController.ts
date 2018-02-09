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

import { Controller, Get, interfaces, QueryParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { ResultList } from "../../common/ResultList";
import { ClientControl, UserControl } from "../../common/Decorators";
import { Role } from "../../common/enum/Role";
import { Temperature } from "./model/temperature/Temperature";
import { FindTemperatureQuery } from "../../common/query/FindTemperatureQuery";
import { TemperatureDTO } from "../../services/query/dto/temperature/TemperatureDTO";
import { TemperatureQueryService } from "../../services/query/TemperatureQueryService";

/**
 * API resources to delivery service to access to temperature element
 *
 * /!\ Resource sample for influx db connection
 *
 * /api/temperatures route
 *
 * @class TrafficController
 */
@Controller("/api/temperatures")
@injectable()
export class TemperatureController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TemperatureController.name);

    /**
     * temperature querying service
     */
    @inject("TemperatureQueryService")
    private temperatureQueryService: TemperatureQueryService;

    /**
     * Get temperatures information
     *
     * @param offset result offset
     * @param limit size of return result
     *
     * @returns {Promise<ResultList<Temperature>>}
     */
    @Get("/")
    @ClientControl(Role.ACCESS_TEMPERATURE)
    public async findAccidents(@QueryParam("offset") offset: number,
                               @QueryParam("limit") limit: number): Promise<ResultList<Temperature>> {
        Utils.checkArgument(offset != null, "Offset must be set");
        Utils.checkArgument(offset >= 0, "Offset cannot be negative");
        Utils.checkArgument(limit != null, "Size must be set");
        Utils.checkArgument(limit > 0, "Size must be superior to zero");

        this.logger.info("Find temperatures information");
        const query: FindTemperatureQuery = new FindTemperatureQuery();
        query.setOffset(Number(offset));
        query.setLimit(Number(limit));

        const resultListTemperatures: ResultList<TemperatureDTO> = await this.temperatureQueryService.findTemperatures(query);
        const returnedTemperatures: Temperature[] = [];

        for (const temperatureDTO of resultListTemperatures.results) {
            const temperature: Temperature = new Temperature();
            temperature.id = temperatureDTO.getId();
            temperature.value = temperatureDTO.getValue();
            temperature.town = temperatureDTO.getTown();

            returnedTemperatures.push(temperature);
        }

        return new ResultList<Temperature>(resultListTemperatures.total, returnedTemperatures);
    }
}
