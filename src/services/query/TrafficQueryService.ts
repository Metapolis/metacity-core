import { CarAccidentDTO } from "./dto/accident/CarAccidentDTO";
/**
 * Contains method to perform traffic query
 */
export interface TrafficQueryService {

    /**
     * Retrieves all traffic accident
     * @returns {string}
     */
    findTrafficAccidents(): Promise<CarAccidentDTO[]>;
}
