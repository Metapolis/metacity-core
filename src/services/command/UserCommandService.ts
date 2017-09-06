import { SaveUserCommandDTO} from "./dto/users/SaveUserCommandDTO";

/**
 * Contains a method to perform a user command
 */
export interface UserCommandService {
    /**
     * Create a new user
     * @param {} saveUserCommandDTO
     * @returns {Promise<number>}
     */
    createUser(saveUserCommandDTO: SaveUserCommandDTO): Promise<number>;
}
