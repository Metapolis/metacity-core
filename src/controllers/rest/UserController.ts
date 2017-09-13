import { Controller, interfaces, Post, RequestBody } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { SaveUser } from "./model/user/SaveUser";
import { UserCommandService } from "../../services/command/UserCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import { SaveUserCommandDTO } from "../../services/command/dto/users/SaveUserCommandDTO";

/**
 * API resources to manage user
 * /api/users
 * @class UserController
 */
@Controller("/api/users")
@injectable()
export class UserController implements interfaces.Controller {

    /**
     * UserController Logger
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(UserController.name);

    /**
     * User command service
     */
    @inject("UserCommandService")
    private userCommandService: UserCommandService;

    /**
     * Create a user
     *
     * @param {SaveUser} user to create
     *
     * @returns {Promise<NumberIdentifier>} created user identifier
     */
    @Post("/")
    public async createCommandUser(@RequestBody() user: SaveUser): Promise<NumberIdentifier> {
        this.logger.debug("Begin user creation");
        const saveUserCommandDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        saveUserCommandDTO.setAvatarURL(user.avatarURL);
        saveUserCommandDTO.setUsername(user.username);
        saveUserCommandDTO.setPassword(user.password);
        saveUserCommandDTO.setEmail(user.email);
        saveUserCommandDTO.setAddress(user.address);

        const userIdentifier: number = await this.userCommandService.createUser(saveUserCommandDTO);

        this.logger.debug("User created with identifier %s", userIdentifier);

        return new NumberIdentifier(userIdentifier);
    }
}