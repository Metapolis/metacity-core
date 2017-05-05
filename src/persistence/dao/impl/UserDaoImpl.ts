import { UserDao } from "../UserDao";
import { User } from "../../domain/User";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";

/**
 * Implementation of {@link UserDao}
 */
@injectable()
export class UserDaoImpl implements UserDao {

    /**
     * UserDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserDaoImpl.name);

    @inject("UserRepository")
    private userRepository: TypeORM.Repository<User>;


    public findByUsername(username: string): User {
        this.logger.info("Retrieve user with username '%s'", username);
        return new User();
    }
}
