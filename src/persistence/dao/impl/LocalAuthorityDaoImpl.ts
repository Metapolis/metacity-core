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
            .innerJoin("la.credential", "cr")
            .andWhere("cr.access_key = :accesskey", {accesskey: accessKey})
            .getOne();
    }
}
