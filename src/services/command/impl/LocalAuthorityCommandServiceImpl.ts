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

import { LocalAuthorityCommandService } from "../LocalAuthorityCommandService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { isNullOrUndefined } from "util";
import { UpdateLocalAuthorityCommandDTO } from "../dto/local-authority/UpdateLocalAuthorityCommandDTO";

/**
 * Implementation of {@link LocalAuthorityCommandService}
 */
@injectable()
export class LocalAuthorityCommandServiceImpl implements LocalAuthorityCommandService {

    /**
     * LocalAuthorityCommandServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(LocalAuthorityCommandServiceImpl.name);

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Override
     */
    public async updateLocalAuthority(command: UpdateLocalAuthorityCommandDTO): Promise<void> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!isNullOrUndefined(command.getId()), "LocalAuthority's identifier cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "LocalAuthority's name cannot be null or empty");
        Utils.checkArgument(!isNullOrUndefined(command.getUIConfig()), "LocalAuthority ui config cannot be undefined or null");
        Utils.checkArgument(!isNullOrUndefined(command.getUIConfig().location), "LocalAuthority location cannot be undefined or null");

        this.logger.debug("Begin update localAuthority with id '%s'", command.getId());

        // Retrieve localAuthority with identifier
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findById(command.getId());

        // Check if localAuthority is found in database
        Utils.checkArgument(localAuthority !== undefined, "LocalAuthority with id '" + command.getId() + "' cannot be found");

        // Set new values
        localAuthority.setName(command.getName());
        localAuthority.setUIConfig(command.getUIConfig());

        // Save localAuthority
        await this.localAuthorityDao.saveOrUpdate(localAuthority);
        this.logger.debug("LocalAuthority '%s' updated", localAuthority.getId());
    }
}
