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

    /**
     * [inject description]
     * @param  {[type]} "UserRepository" [description]
     * @return {[type]}                  [description]
     */
    @inject("UserRepository")
    private userRepository: TypeORM.Repository<User>;

    /**
     * Override
     */
    public async findByUsername(username: string): Promise<User> | undefined {
        this.logger.info("Retrieve user with username '%s'", username);
        return await this.userRepository.findOne({
            username: username
        });
    }
}
