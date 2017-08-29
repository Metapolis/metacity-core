import { SaveCircleCommandDTO } from "./dto/circles/CircleDTO";

/**
 * Contains a method to perform a circle command
 */

export interface CircleCommandService {
    /**
     * Create new circle
     *
     * @param {SaveCircleCommandDTO} saveCircleCommandDTO used to create a DTO
     * @returns {Promise<number>} circle created identifier
     */
    createCircle(saveCircleCommandDTO: SaveCircleCommandDTO): Promise<number>;

}
