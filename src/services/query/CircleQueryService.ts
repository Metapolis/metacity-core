import { CircleDTO } from "./dto/circle/CircleDTO";
import { ResultList } from "../../common/ResultList";

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

    /**
     * Check if circle is owned by localAuthority
     *
     * @param {number} circleId circle identifier
     * @param {number} localAuthorityId localAuthority identifier
     *
     * @returns {boolean} true means localAuthority own circle
     */
    isOwnedByLocalAuthority(circleId: number, localAuthorityId: number): Promise<boolean>;

    /**
     * Get specific circle
     *
     * @param {number} circleId circle identifier
     * @returns {CircleDTO} return the DTO of specific circle
     */
    getCircle(circleId: number): Promise<CircleDTO> | null;

    /**
     * Get list of circles
     *
     * @returns DTOs of circles
     */
    getCircles(limit?: number): Promise<ResultList<CircleDTO>> | null;
}
