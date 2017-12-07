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

import { UserDao } from "../UserDao";
import { User } from "../../domain/User";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { SelectQueryBuilder } from "typeorm";
import { inject, injectable } from "inversify";
import { FindUserQuery } from "../../../common/query/FindUserQuery";

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
    public async saveOrUpdate(user: User): Promise<void> {
        this.logger.info("Persist new user '%s'", user.getEmail());
        await this.userRepository.save(user);
        this.logger.info("User saved");
    }

    /**
     * Override
     */
    public async findBy(query: FindUserQuery): Promise<User[]> {
        const users: User[] = await this.computeQuery(query).offset(query.getOffset()).limit(query.getLimit()).getMany();

        this.logger.debug("'%s' users retrieves", users.length);

        return users;
    }

    /**
     * Override
     */
    public async countBy(query: FindUserQuery): Promise<number> {
        return await this.computeQuery(query).getCount();
    }

    /**
     * Computes query used by {@link #countBy(FindUserQuery)} and {@link #findBy(FindUserQuery)}
     *
     * @param query query object
     *
     * @return TypeORM query
     */
    private computeQuery(query: FindUserQuery): SelectQueryBuilder<User> {
        const queryBuilder: SelectQueryBuilder<User> = this.userRepository.createQueryBuilder("u");

        if (query.isSet()) {
            if (query.getQFilter()) {
                for (let i = 0; i < query.getQFilter().getMustParams().length; i++) {
                    let whereClause: string = "(LOWER(u.first_name) like LOWER(:qmust" + String(i) + ") ";
                    whereClause = whereClause.concat("or LOWER(u.last_name) like LOWER(:qmust", String(i), ") ");
                    whereClause = whereClause.concat("or LOWER(u.email) like LOWER(:qmust", String(i), ") ");
                    if (!isNaN(Number(query.getQFilter().getMustParams()[i]))) {
                        whereClause = whereClause.concat("or u.id = :qmustnumber", String(i), ") ");
                        queryBuilder.setParameter("qmustnumber" + String(i), query.getQFilter().getMustParams()[i]);
                    } else {
                        whereClause = whereClause.concat(") ");
                    }

                    // If no where were set and where add the first where
                    queryBuilder.andWhere(whereClause);

                    queryBuilder.setParameter("qmust" + String(i), "%" + query.getQFilter().getMustParams()[i] + "%");
                }

                if (query.getQFilter().getShouldParams().length > 0) {
                    let whereClause: string = "(";
                    for (let i = 0; i < query.getQFilter().getShouldParams().length; i++) {
                        if (i !== 0) {
                            whereClause = whereClause.concat("or ");
                        }
                        whereClause = whereClause.concat("LOWER(u.first_name) like LOWER(:qshould", String(i), ") ");
                        whereClause = whereClause.concat("or LOWER(u.last_name) like LOWER(:qshould", String(i), ") ");
                        whereClause = whereClause.concat("or LOWER(u.email) like LOWER(:qshould", String(i), ") ");
                        if (!isNaN(Number(query.getQFilter().getShouldParams()[i]))) {
                            whereClause = whereClause.concat("or u.id = :qshouldnumber", String(i), " ");
                            queryBuilder.setParameter("qshouldnumber" + String(i), Number(query.getQFilter().getShouldParams()[i]));
                        }
                        queryBuilder.setParameter("qshould" + String(i), "%" + query.getQFilter().getShouldParams()[i] + "%");
                    }
                    whereClause = whereClause.concat(") ");
                    queryBuilder.andWhere(whereClause);
                }
            }
        }

        // sort by first and last name
        queryBuilder.orderBy("u.first_name", "ASC");
        queryBuilder.addOrderBy("u.last_name", "ASC");

        this.logger.debug("Computed query is : '%s'", queryBuilder.getSql());
        return queryBuilder;
    }
}
