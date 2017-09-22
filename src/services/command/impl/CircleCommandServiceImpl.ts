import { CircleCommandService } from "../CircleCommandService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { SaveCircleCommandDTO } from "../dto/circles/SaveCircleCommandDTO";
import { CollectivityDao } from "../../../persistence/dao/CollectivityDao";
import { Collectivity } from "../../../persistence/domain/Collectivity";
import { ActivityCircle } from "../../../persistence/domain/ActivityCircle";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { isNullOrUndefined } from "util";
import { UpdateCircleCommandDTO } from "../dto/circles/UpdateCircleCommandDTO";

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
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        this.logger.debug("Begin circle creation for '%s'", command.getName());

        // Retrieve collectivity with identifier
        const collectivity: Collectivity = await this.collectivityDao.findById(command.getAccessKey());

        // Check if collectivity is found in database
        Utils.checkArgument(collectivity !== undefined, "Collectivity for access key : '" + command.getAccessKey() + "' cannot be found");

        const circle: ActivityCircle = new ActivityCircle();
        circle.setCollectivity(Promise.resolve(collectivity));
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        circle.setDescription(command.getDescription());
        circle.setAvatarUrl(command.getAvatarURL());

        this.logger.debug("Create new circle");
        await this.circleDao.saveOrUpdate(circle);
        this.logger.debug("New circle created with id: '%s'", circle.getId());

        return circle.getId();
    }

    /**
     * Override
     */
    public async updateCircle(command: UpdateCircleCommandDTO): Promise<void> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!isNullOrUndefined(command.getId()), "Command circle identifier cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        this.logger.debug("Begin update circle with id '%s'", command.getId());

        // Retrieve collectivity with identifier
        const collectivity: Collectivity = await this.collectivityDao.findById(command.getAccessKey());

        // Check if collectivity is found in database
        Utils.checkArgument(collectivity !== undefined, "Collectivity for access key : '" + command.getAccessKey() + "' cannot be found");

        // Retrieve circle with identifier
        const circle: ActivityCircle = await this.circleDao.findById(command.getId());

        // Check if collectivity is found in database
        Utils.checkArgument(circle !== undefined, "Circle with id '" + command.getId() + "' cannot be found");
        Utils.checkArgument((await circle.getCollectivity()).getId() === collectivity.getId(), "Circle '" + circle.getId() + "' and collectivity '" + collectivity.getId() + "'have to be linked ");

        // Set new values
        circle.setAvatarUrl(command.getAvatarURL());
        circle.setDescription(command.getDescription());
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());

        // Save circle
        await this.circleDao.saveOrUpdate(circle);
        this.logger.debug("Circle '%s' updated", circle.getId());
    }
}
