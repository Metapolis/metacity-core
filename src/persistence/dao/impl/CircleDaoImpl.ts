import { CircleDao } from "../CircleDao";
import { Circle } from "../../domain/Circle";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import * as TypeORM from "typeorm";
import { inject, injectable } from "inversify";

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
    public async saveOrUpdate(circle: Circle): Promise<void> | undefined {
        this.logger.info("Persist new circle '%s'", circle.getName());
        await this.circleRepository.save(circle);
        this.logger.info("Circle saved");
    }

    /**
     * Override
     */
    public async exists(id: number): Promise<boolean> {
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
}
