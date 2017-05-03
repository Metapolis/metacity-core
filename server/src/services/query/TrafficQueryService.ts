import { CarAccident } from "./dto/accident/CarAccident";
/**
 * Contains method to perform traffic query
 */
export interface TrafficQueryService {

    /**
     * Retrieves all traffic accident
     * @returns {string}
     */
    findTrafficAccidents(): Promise<CarAccident[]>;
}
