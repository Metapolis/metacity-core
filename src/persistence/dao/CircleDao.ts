import { Circle } from "../domain/Circle";

/**
 * Data Access Object of {@link CircleDao}
 */
export interface CircleDao {

    /**
     * Save or update a circle
     *
     * @param {Circle} circle to save
     *
     */
    saveOrUpdate(circle: Circle): Promise<void> | undefined;

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
     * @returns {Promise<Circle>} circle found
     */
    findById(id: number): Promise<Circle> | undefined;

    /**
     * Retrieves all circles
     *
     * @returns circles
     */
    findAll(): Promise<Circle[]> | undefined;

    /**
     * Check if circle is owned by localAuthority
     *
     * @param {number} circleId circle identifier
     * @param {string} accessKey localAuthority identifier
     *
     * @returns {boolean} true means localAuthority own circle
     */
    isOwnedByLocalAuthority(circleId: number, accessKey: string): Promise<boolean>;
}
