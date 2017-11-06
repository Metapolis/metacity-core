import { User } from "../domain/User";
import { FindUserQuery } from "../../common/query/FindUserQuery";

/**
 * Data Access Object of {@link User}
 */
export interface UserDao {

    /**
     * Retrieve user by email
     *
     * @param email email to find
     */
    findByEmail(email: string): Promise<User> | undefined;

    /**
     * Retrieve user by id
     *
     * @param id identifier to find
     */
    findById(id: number): Promise<User> | undefined;

    /**
     * Find users
     *
     * @param {FindUserQuery} query query use to find users
     *
     * @returns {Promise<User[]>} users found
     */
    findBy(query: FindUserQuery): Promise<User[]>;

    /**
     * Save or update a user
     *
     * @param {User} user to create
     */
    saveOrUpdate(user: User): Promise<void>;

    /**
     * Count user for a specific query
     *
     * @param {FindUserQuery} query query use to count users
     *
     * @returns {number} number of found user
     */
    countBy(query: FindUserQuery): Promise<number>;
}
