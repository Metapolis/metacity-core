import { LocalAuthorityQueryService } from "../LocalAuthorityQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { LocalAuthorityDTO } from "../dto/localauthority/LocalAuthorityDTO";

/**
 * Implementation of {@link LocalAuthorityQueryService}
 */
@injectable()
export class LocalAuthorityQueryServiceImpl implements LocalAuthorityQueryService {

    /**
     * LocalAuthorityQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(LocalAuthorityQueryServiceImpl.name);

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Override
     * @param domain
     * @returns {undefined}
     */
    public async getLocalAuthority(domain: string): Promise<LocalAuthorityDTO> | null {
        Utils.checkArgument(!Utils.isNullOrEmpty(domain), "Domain cannot be null or empty");

        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(domain);
        if (localAuthority === undefined) {
            this.logger.debug("LocalAuthority '%s' not found", domain);
            return null;
        }

        const localAuthorityDto: LocalAuthorityDTO = new LocalAuthorityDTO();
        localAuthorityDto.setId(localAuthority.getId());
        localAuthorityDto.setName(localAuthority.getName());
        localAuthorityDto.setSecret((await localAuthority.getCredential()).getSecret());

        return localAuthorityDto;
    }

}
