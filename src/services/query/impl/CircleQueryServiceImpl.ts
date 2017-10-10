import { CircleQueryService } from "../CircleQueryService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { ActivityCircle } from "../../../persistence/domain/ActivityCircle";
import { CircleDTO } from "../dto/circle/CircleDTO";
import { Role } from "../../../common/enum/Role";
import { UserDTO } from "../dto/circle/UserDTO";

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
    public async isOwnedByCollectivity(circleId: number, accessKey: string): Promise<boolean> {
        this.logger.debug("Check if circle '%s' is owned by collectivity '%s'", circleId, accessKey);
        return await this.circleDao.isOwnedByCollectivity(circleId, accessKey);
    }

    /**
     * Override
     */
    public async getCircle(circleId: number): Promise<CircleDTO> | null {
        this.logger.debug("Retrieve circle '%s'", circleId);
        const circle: ActivityCircle = await this.circleDao.findById(circleId);

        if (circle === undefined) {
            this.logger.debug("Cannot retrieve circle '%s'", circleId);
            return null;
        }

        const circleDTO: CircleDTO = new CircleDTO();
        circleDTO.setId(circle.getId());
        circleDTO.setName(circle.getName());
        circleDTO.setDescription(circle.getDescription());
        circleDTO.setAvatarUrl(circle.getAvatarUrl());

        for (const role of circle.getRoles()) {
            if (role in Role) {
                circleDTO.getRoles().push(role as Role);
            } else {
                this.logger.debug("The role '%s' is not supported", role);
            }
        }

        for (const user of (await circle.getUsers())) {
            const userDTO: UserDTO = new UserDTO();
            // TODO add first name and last name
            userDTO.setId(user.getId());
            circleDTO.getMembers().push(userDTO);
        }

        return circleDTO;
    }
}
