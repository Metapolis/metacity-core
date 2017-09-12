import { SaveUserCommandDTO} from "./dto/users/SaveUserCommandDTO";

/**
 * Contains a method to perform a user command
 */
export interface UserCommandService {
    /**
     * Create a new user
     * @param {SaveUserCommandDTO} command command used to create new user
     * @returns {Promise<number>} return user created identifier
     */
    createUser(command: SaveUserCommandDTO): Promise<number>;
}
