import { CircleQueryService } from "../CircleQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { Circle } from "../../../persistence/domain/Circle";
import { CircleDTO } from "../dto/circle/CircleDTO";
import { Role } from "../../../common/enum/Role";
import { UserDTO } from "../dto/circle/UserDTO";
import { ResultList } from "../../../common/ResultList";

/**
 * Implementation of {@link CircleQueryService}
 */
@injectable()
export class CircleQueryServiceImpl implements CircleQueryService {

    /**
     * CircleQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(CircleQueryServiceImpl.name);

    /**
     * Circle data access object
     */
    @inject("CircleDao")
    private circleDao: CircleDao;

    /**
     * Override
     */
    public async exists(id: number): Promise<boolean> {
        this.logger.debug("Check if circle with id '%s' exists", id);

        return await this.circleDao.exists(id);
    }

    /**
     * Override
     */
    public async isOwnedByLocalAuthority(circleId: number, localAuthorityId: number): Promise<boolean> {
        this.logger.debug("Check if circle '%s' is owned by localAuthority '%s'", circleId, localAuthorityId);
        return await this.circleDao.isOwnedByLocalAuthority(circleId, localAuthorityId);
    }

    /**
     * Override
     */
    public async getCircle(circleId: number): Promise<CircleDTO> | null {
        this.logger.debug("Retrieve circle '%s'", circleId);
        const circle: Circle = await this.circleDao.findById(circleId);

        if (circle === undefined) {
            this.logger.debug("Cannot retrieve circle '%s'", circleId);
            return null;
        }

        const circleDTO: CircleDTO = new CircleDTO();
        circleDTO.setId(circle.getId());
        circleDTO.setName(circle.getName());
        circleDTO.setDefaultCircle(circle.isDefaultCircle());

        for (const role of circle.getRoles()) {
            if (role in Role) {
                circleDTO.getRoles().push(role as Role);
            } else {
                this.logger.debug("The role '%s' is not supported", role);
            }
        }

        for (const user of (await circle.getUsers())) {
            const userDTO: UserDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setLastName(user.getLastName());
            userDTO.setFirstName(user.getFirstName());
            circleDTO.getMembers().push(userDTO);
        }
        return circleDTO;
    }

    /** Override */
    public async getCircles(limit: number = 720): Promise<ResultList<CircleDTO>> | null {
        this.logger.debug("Retrieving circles");
        const circles: Circle[] = await this.circleDao.findAll();
        const circlesDTO: CircleDTO[] = [];
        if (circles === undefined) {
            this.logger.debug("Could not retrieve any circle");
            return null;
        }

        for (const circle of circles) {
            const circleDTO: CircleDTO = new CircleDTO();
            circleDTO.setId(circle.getId());
            circleDTO.setName(circle.getName());
            circleDTO.setDefaultCircle(circle.isDefaultCircle());
            /** please report to your local authorities */
            circlesDTO.push(circleDTO);
        }

        return new ResultList<CircleDTO>(circlesDTO.length, circlesDTO);
    }
}
