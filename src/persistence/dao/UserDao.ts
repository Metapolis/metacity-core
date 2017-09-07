import { User } from "../domain/User";

/**
 * Data Access Object of {@link User}
 */
export interface UserDao {

    /**
     * Retrieve user by username
     *
     * @param username username to find
     */
    findByUsername(username: string): Promise<User> | undefined;

    /**
     * Retrieve user by id
     *
     * @param id identifier to find
     */
    findById(id: number): Promise<User> | undefined;
}
