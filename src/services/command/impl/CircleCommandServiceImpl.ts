import { CircleCommandService } from "../CircleCommandService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { SaveCircleCommandDTO } from "../dto/circles/SaveCircleCommandDTO";
import { CollectivityDao } from "../../../persistence/dao/CollectivityDao";
import { Collectivity } from "../../../persistence/domain/Collectivity";
import { ActivityCircle } from "../../../persistence/domain/ActivityCircle";

/**
 * Implementation of {@link CircleCommandService}
 */
@injectable()
export class CircleCommandServiceImpl implements CircleCommandService {

    /**
     * CircleCommandServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */

    private logger: LoggerInstance = Utils.createLogger(CircleCommandServiceImpl.name);

    /**
     * Circle data access object
     */
    @inject("CircleDao")
    private circleDao: CircleDao;

    /**
     * Collectivity data access object
     */
    @inject("CollectivityDao")
    private collectivityDao: CollectivityDao;

    /**
     * Override
     */
    public async createCircle(command: SaveCircleCommandDTO): Promise<number> {
        Utils.checkArgument(command != null && command !== undefined, "Command cannot be undefined or null");
        Utils.checkArgument(Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        this.logger.debug("Begin circle creation for '%s'", command.getName());

        // Retrieve collectivity with identifier
        const collectivity: Collectivity = await this.collectivityDao.findById(command.getAccessKey());

        // Check if collectivity is found in database
        Utils.checkArgument(collectivity !== undefined, "Collectivity for access key : '" + command.getAccessKey() + "' cannot be found");

        const circle: ActivityCircle = new ActivityCircle();
        circle.setCollectivity(collectivity);
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        // Retrieve description if given by client
        if (Utils.checkArgument(command.getDescription() != null && command.getDescription() !== undefined, "Null or undefined description can't be written")) {
            circle.setDescription(command.getDescription());
        }
        // Retrieve avatarURL if given by client
        if (Utils.checkArgument(command.getAvatarURL() != null && command.getAvatarURL() !== undefined, "Null or undefined avatarURL can't be written")) {
            circle.setAvatarUrl(command.getAvatarURL());
        }

        await this.circleDao.saveOrUpdate(circle);

        return circle.getId();
    }
}
