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
    public async findById(id: number): Promise<LocalAuthority> | undefined {
        this.logger.info("Retrieve localAuthority with identifier '%s'", id);

        return await this.localAuthorityRepository.findOneById(id);
    }

    /**
     * Override
     */
    public async findByCredentialAccessKey(accessKey: string): Promise<LocalAuthority> | undefined {
        this.logger.debug("Retrieve local authority with credential access key '%s'", accessKey);

        return await this.localAuthorityRepository.createQueryBuilder("la")
            .innerJoin("la.credential", "c")
            .andWhere("cr.access_key = :accesskey", {accesskey: accessKey})
            .getOne();
    }
}
