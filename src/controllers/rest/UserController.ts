import { Controller, interfaces, Next, Response, Post, RequestBody } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveUser } from "./model/user/SaveUser";
import { UserCommandService } from "../../services/command/UserCommandService";
import { NumberIdentifier } from "./model/common/NumberIdentifier";
import { SaveUserCommandDTO } from "../../services/command/dto/users/SaveUserCommandDTO";

/**
 * API resources to create user
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
     * @param {SaveUser} user
     * @param {e.NextFunction} next
     * @param {e.Response} response
     * @returns {Promise<NumberIdentifier>}
     */
    @Post("/")
    public async createCommandUser(@RequestBody() user: SaveUser, @Next() next: Express.NextFunction,  @Response() response: Express.Response): Promise<NumberIdentifier> {
        this.logger.debug("Begin creation");
        const saveUserCommandDTO: SaveUserCommandDTO = new SaveUserCommandDTO();
        saveUserCommandDTO.setAvatarURL(user.avatarURL);
        saveUserCommandDTO.setUsername(user.username);
        saveUserCommandDTO.setPassword(user.password);
        saveUserCommandDTO.setEmailAddress(user.emailAddress);
        saveUserCommandDTO.setAddress(user.address);

        const userIdentifier: number = await this.userCommandService.createUser(saveUserCommandDTO);

        return new NumberIdentifier(userIdentifier);

    }
}
