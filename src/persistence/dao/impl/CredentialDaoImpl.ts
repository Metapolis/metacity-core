import { CredentialDao } from "../CredentialDao";
import { Credential } from "../../domain/Credential";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";

/**
 * Implementation of {@link CredentialDao}
 */
@injectable()
export class CredentialDaoImpl implements CredentialDao {

    /**
     * CredentialDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CredentialDaoImpl.name);

    /**
     * Credential data access
     */
    @inject("CredentialRepository")
    private credentialRepository: TypeORM.Repository<Credential>;

    /**
     * Override
     */
    public async findByAccessKey(accessKey: string): Promise<Credential | undefined> {
        this.logger.debug("Retrieve credential with access key '%s'", accessKey);

        return await this.credentialRepository.findOneById(accessKey);
    }
}
