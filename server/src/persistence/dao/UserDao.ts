import { User } from "../domain/User";

export interface UserDao {

    /**
     * Retrieve user by username
     *
     * @param username username to find
     */
    findByUsername(username: string): Promise<User> | undefined;
}
