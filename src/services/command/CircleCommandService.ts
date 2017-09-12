import { SaveCircleCommandDTO } from "./dto/circles/SaveCircleCommandDTO";

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
}
