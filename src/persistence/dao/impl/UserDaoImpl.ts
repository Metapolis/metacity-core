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
     * User data access
     */
    @inject("UserRepository")
    private userRepository: TypeORM.Repository<User>;

    /**
     * Override
     */
    public async findByEmail(email: string): Promise<User> | undefined {
        this.logger.info("Retrieve user with email '%s'", email);
        return await this.userRepository.findOne({where: {email: email}});
    }

    /**
     * Override
     */
    public async findById(id: number): Promise<User> | undefined {
        this.logger.info("Retrieve user with identifier '%s'", id);
        return await this.userRepository.findOneById(id);
    }

    /**
     * Override
     */
    public async saveOrUpdate(user: User): Promise<void>  {
        this.logger.info("Persist new user '%s'", user.getEmail());
        await this.userRepository.save(user);
        this.logger.info("User saved");
    }
}
