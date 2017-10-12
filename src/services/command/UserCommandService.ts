import { SaveUserCommandDTO } from "./dto/user/SaveUserCommandDTO";

/**
 * Contains methods to perform user commands
 */
export interface UserCommandService {

    /**
     * Create a new user
     *
     * @param {SaveUserCommandDTO} command command used to create new user
     * @returns {Promise<number>} return user created identifier
     */
    createUser(command: SaveUserCommandDTO): Promise<number>;
}
