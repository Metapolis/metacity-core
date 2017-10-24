import { SaveCircleCommandDTO } from "./dto/circle/SaveCircleCommandDTO";
import { UpdateCircleCommandDTO } from "./dto/circle/UpdateCircleCommandDTO";

/**
 * Contains methods to perform circle commands
 */
export interface CircleCommandService {

    /**
     * Create new circle
     *
     * @param {SaveCircleCommandDTO} saveCircleCommandDTO used to create a circle
     *
     * @returns {Promise<number>} circle created identifier
     */
    createCircle(saveCircleCommandDTO: SaveCircleCommandDTO): Promise<number>;

    /**
     * Update specific circle
     *
     * @param {UpdateCircleCommandDTO} updateCircleCommandDTO used to update a circle
     */
    updateCircle(updateCircleCommandDTO: UpdateCircleCommandDTO): Promise<void>;

    /**
     * Delete specific circle
     *
     * @param {number} circleId circle identifier
     * @returns {Promise<void>}
     */
    deleteCircle(circleId: number): Promise<void>;
}
