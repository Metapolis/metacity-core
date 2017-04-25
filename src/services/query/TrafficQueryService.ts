
/**
 * Contains method to perform traffic query
 */
export interface TrafficQueryService {

    /**
     * Retrieves all traffic incident
     * @returns {string}
     */
    findTrafficIncident(): Promise<{}>;
}
