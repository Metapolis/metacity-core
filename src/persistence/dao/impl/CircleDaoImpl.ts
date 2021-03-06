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

import { CircleDao } from "../CircleDao";
import { Circle } from "../../domain/Circle";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";
import { FindCircleQuery } from "../../../common/query/FindCircleQuery";
import { SelectQueryBuilder } from "typeorm/query-builder/SelectQueryBuilder";

/**
 * Implementation of {@link CircleDao}
 */
@injectable()
export class CircleDaoImpl implements CircleDao {

    /**
     * CircleDaoImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleDaoImpl.name);

    /**
     * Circle data access
     */
    @inject("CircleRepository")
    private circleRepository: TypeORM.Repository<Circle>;

    /**
     * Override
     */
    public async saveOrUpdate(circle: Circle): Promise<void> {
        this.logger.info("Persist new circle '%s'", circle.getName());
        await this.circleRepository.save(circle);
        this.logger.info("Circle saved");
    }

    /**
     * Override
     */
    public async isExists(id: number): Promise<boolean> {
        this.logger.debug("Check in data base if circle with id '%s' exists", id);

        return (await this.circleRepository.count({where: {id: id}})) > 0;
    }

    /**
     * Override
     */
    public async findById(id: number): Promise<Circle> | undefined {
        this.logger.info("Retrieve circle with identifier '%s'", id);

        return await this.circleRepository.findOneById(id);
    }

    /**
     * Computes query used by {@link #countBy(FindCircleQuery)} and {@link #findBy(FindCircleQuery)}
     *
     * @param query query object
     *
     * @return TypeORM query
     */
    private computeQuery(query: FindCircleQuery): SelectQueryBuilder<Circle> {
        const queryBuilder: SelectQueryBuilder<Circle> = this.circleRepository.createQueryBuilder("circle");
        if (query.isSet()) {
            if (query.getLocalAuthorityId() !== undefined) {
                queryBuilder
                    .innerJoinAndSelect("circle.localAuthority", "localAuthority")
                    .where("(localAuthority.id = :localAuthority)")
                    .setParameters({localAuthority: query.getLocalAuthorityId()});
            }
        }
        queryBuilder.orderBy("circle.name", "ASC");

        this.logger.debug("Computed query is : '%s'", queryBuilder.getSql());

        return queryBuilder;
    }

    /**
     * Override
     */
    public async findBy(query: FindCircleQuery): Promise<Circle[]> {
        const circles: Circle[] = await this.computeQuery(query).offset(query.getOffset()).limit(query.getLimit()).getMany();

        this.logger.debug("'%s' circles retrieves", circles.length);

        return circles;
    }

    /**
     * Override
     */
    public async countBy(query: FindCircleQuery): Promise<number> {
        return await this.computeQuery(query).getCount();
    }

    /**
     * Override
     */
    public async isOwnedByLocalAuthority(circleId: number, localAuthorityId: number): Promise<boolean> {
        this.logger.debug("Check if circle '%s' is owned by localAuthority '%s' in database", circleId, localAuthorityId);

        return (await this.circleRepository.createQueryBuilder("c")
            .innerJoin("c.localAuthority", "la")
            .where("c.id = :circleid", {circleid: circleId})
            .andWhere("la.id = :localauthorityid", {localauthorityid: localAuthorityId})
            .getCount()) === 1;
    }

    /**
     * Override
     */
    public async deleteCircle(circle: Circle): Promise<void> {
        this.logger.info("Delete circle '%s'", circle.getName());
        await this.circleRepository.remove(circle);
        this.logger.info("Circle deleted");
    }
}
