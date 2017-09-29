import { ActivityCircle } from "../domain/ActivityCircle";

/**
 * Data Access Object of {@link CircleDao}
 */
export interface CircleDao {

    /**
     * Save or update a circle
     *
     * @param {ActivityCircle} circle to save
     *
     */
    saveOrUpdate(circle: ActivityCircle): Promise<void> | undefined;

    /**
     * Check if this specific circle exists
     *
     * @param {number} id circle's identifier
     *
     * @returns {Promise<boolean>} true means circle exists in database
     */
    exists(id: number): Promise<boolean>;

    /**
     * Retrieves a specific circle
     *
     * @param {number} id circle identifier
     *
     * @returns {Promise<ActivityCircle>} circle found
     */
    findById(id: number): Promise<ActivityCircle> | undefined;

    /**
     * Check if circle is owned by collectivity
     *
     * @param {number} circleId circle identifier
     * @param {string} accessKey collectivity identifier
     *
     * @returns {boolean} true means collectivity own circle
     */
    isOwnedByCollectivity(circleId: number, accessKey: string): Promise<boolean>;
}
