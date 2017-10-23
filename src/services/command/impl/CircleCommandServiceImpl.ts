import { CircleCommandService } from "../CircleCommandService";
import { inject, injectable } from "inversify";
import { Client } from "elasticsearch";
import { Utils } from "../../../common/Utils";
import { LoggerInstance } from "winston";
import { SaveCircleCommandDTO } from "../dto/circle/SaveCircleCommandDTO";
import { LocalAuthorityDao } from "../../../persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../persistence/domain/LocalAuthority";
import { Circle } from "../../../persistence/domain/Circle";
import { CircleDao } from "../../../persistence/dao/CircleDao";
import { User } from "../../../persistence/domain/User";
import { isNullOrUndefined } from "util";
import { UpdateCircleCommandDTO } from "../dto/circle/UpdateCircleCommandDTO";
import { UserDao } from "../../../persistence/dao/UserDao";

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
     * User data access object
     */
    @inject("UserDao")
    private userDao: UserDao;

    /**
     * LocalAuthority data access object
     */
    @inject("LocalAuthorityDao")
    private localAuthorityDao: LocalAuthorityDao;

    /**
     * Override
     */
    public async createCircle(command: SaveCircleCommandDTO): Promise<number> {
        Utils.checkArgument(!isNullOrUndefined(command), "Command cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        Utils.checkArgument(!isNullOrUndefined(command.isDefaultCircle()), "Default circle cannot be undefined or null");

        this.logger.debug("Begin circle creation for '%s'", command.getName());

        // Retrieve localAuthority with identifier
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(command.getAccessKey());

        // Check if localAuthority is found in database
        Utils.checkArgument(localAuthority !== undefined, "LocalAuthority for access key : '" + command.getAccessKey() + "' cannot be found");

        const circle: Circle = new Circle();
        circle.setLocalAuthority(Promise.resolve(localAuthority));
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        circle.setDefaultCircle(command.isDefaultCircle());

        const members: User[] = await circle.getUsers();
        for (const id of command.getMembers()) {
            members.push(await this.userDao.findById(id));
        }

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
        Utils.checkArgument(!isNullOrUndefined(command.getId()), "Circle's identifier cannot be undefined or null");
        Utils.checkArgument(!Utils.isNullOrEmpty(command.getName()), "Circle's name cannot be null or empty");
        Utils.checkArgument(command.getRoles() != null, "Circle's roles cannot be null");
        Utils.checkArgument(!isNullOrUndefined(command.isDefaultCircle()), "Default circle cannot be undefined or null");

        this.logger.debug("Begin update circle with id '%s'", command.getId());

        // Retrieve localAuthority with identifier
        const localAuthority: LocalAuthority = await this.localAuthorityDao.findByCredentialAccessKey(command.getAccessKey());

        // Check if localAuthority is found in database
        Utils.checkArgument(localAuthority !== undefined, "LocalAuthority for access key : '" + command.getAccessKey() + "' cannot be found");

        // Retrieve circle with identifier
        const circle: Circle = await this.circleDao.findById(command.getId());

        let members: User[] = [];

        // Check if localAuthority is found in database
        Utils.checkArgument(circle !== undefined, "Circle with id '" + command.getId() + "' cannot be found");
        Utils.checkArgument((await circle.getLocalAuthority()).getId() === localAuthority.getId(), "Circle '" + circle.getId() + "' and localAuthority '" + localAuthority.getId() + "'have to be linked ");

        // Set new values
        circle.setDefaultCircle(command.isDefaultCircle());
        circle.setName(command.getName());
        circle.setRoles(command.getRoles());
        members = await circle.getUsers();
        for (const id of command.getMembers()) {
            members.push(await this.userDao.findById(id));
        }

        circle.setUsers(Promise.resolve(members));

        // Save circle
        await this.circleDao.saveOrUpdate(circle);
        this.logger.debug("Circle '%s' updated", circle.getId());
    }
}
