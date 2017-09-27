/**
 * Contains method to perform circle query
 */
export interface CircleQueryService {

    /**
     * Check if circle exists
     *
     * @param id circle's identifier
     *
     * @returns {Promise<boolean>} true means circle with this specific identifier exists
     */
    exists(id: number): Promise<boolean>;
}
