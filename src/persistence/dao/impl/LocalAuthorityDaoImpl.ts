import { LocalAuthorityDao } from "../LocalAuthorityDao";
import { LocalAuthority } from "../../domain/LocalAuthority";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";

/**
 * Implementation of {@link LocalAuthorityDao}
 */
@injectable()
export class LocalAuthorityDaoImpl implements LocalAuthorityDao {

    /**
     * LocalAuthorityDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(LocalAuthorityDaoImpl.name);

    /**
     * LocalAuthority data access
     */
    @inject("LocalAuthorityRepository")
    private localAuthorityRepository: TypeORM.Repository<LocalAuthority>;

    /**
     * Override
     */
    public async findById(id: string): Promise<LocalAuthority> | undefined {
        this.logger.info("Retrieve localAuthority with identifier '%s'", id);
        return await this.localAuthorityRepository.findOneById(id);
    }
}
