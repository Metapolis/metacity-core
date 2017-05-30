import { CarAccidentDTO } from "./dto/accident/CarAccidentDTO";
import { FindTrafficAccidentQuery } from "../../common/query/FindTrafficAccidentQuery";

/**
 * Contains method to perform traffic query
 */
export interface TrafficQueryService {

    /**
     * Retrieves all traffic accident
     *
     * @param query Query use to find CarAccident
     *
     * @returns {string}
     */
    findTrafficAccidents(query: FindTrafficAccidentQuery): Promise<CarAccidentDTO[]>;
}
