import { CarAccidentDTO } from "./dto/accident/CarAccidentDTO";
import { FindTrafficAccidentQuery } from "../../common/query/FindTrafficAccidentQuery";
import { ResultList } from "../../common/ResultList";

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
    findTrafficAccidents(query: FindTrafficAccidentQuery): Promise<ResultList<CarAccidentDTO>>;
}
