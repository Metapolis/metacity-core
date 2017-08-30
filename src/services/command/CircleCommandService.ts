import { SaveCircleCommandDTO } from "./dto/circles/SaveCircleCommandDTO";

/**
 * Contains a method to perform a circle command
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
}
