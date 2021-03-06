/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { LocalAuthorityQueryService } from "../LocalAuthorityQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { LocalAuthorityDTO } from "../dto/local-authority/LocalAuthorityDTO";
import { isNullOrUndefined } from "util";

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
     */
    public async isExists(id: number): Promise<boolean> {
        this.logger.debug("Check if local authority with id '%s' exists", id);

        return await this.localAuthorityDao.isExists(id);
    }

    /**
     * Override
     */
    public async getLocalAuthorityByAccessKey(accessKey: string): Promise<LocalAuthorityDTO | undefined> {
        Utils.checkArgument(!Utils.isNullOrEmpty(accessKey), "Access key cannot be null or empty");

        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(accessKey);
        if (localAuthority === undefined) {
            this.logger.debug("LocalAuthority '%s' not found", accessKey);
            return undefined;
        }

        const localAuthorityDto: LocalAuthorityDTO = new LocalAuthorityDTO();
        localAuthorityDto.setId(localAuthority.getId());
        localAuthorityDto.setName(localAuthority.getName());
        localAuthorityDto.setUIConfig(localAuthority.getUIConfig());
        localAuthorityDto.setSecret((await localAuthority.getCredential()).getSecret());

        return localAuthorityDto;
    }

    /**
     * Override
     */
    public async getLocalAuthority(id: number): Promise<LocalAuthorityDTO | undefined> {
        Utils.checkArgument(!isNullOrUndefined(id), "Identifier cannot be null or undefined");

        const localAuthority: LocalAuthority = await this.localAuthorityDao.findById(id);
        if (localAuthority === undefined) {
            this.logger.debug("LocalAuthority '%s' not found", id);
            return undefined;
        }

        const localAuthorityDto: LocalAuthorityDTO = new LocalAuthorityDTO();
        localAuthorityDto.setId(localAuthority.getId());
        localAuthorityDto.setName(localAuthority.getName());
        localAuthorityDto.setUIConfig(localAuthority.getUIConfig());
        localAuthorityDto.setSecret((await localAuthority.getCredential()).getSecret());

        return localAuthorityDto;
    }

}
