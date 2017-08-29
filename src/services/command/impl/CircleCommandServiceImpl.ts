import { CircleCommandService} from "../CircleCommandService";
import { inject, injectable} from "inversify";
import { Client} from "elasticsearch";
import { Utils} from "../../../common/Utils";
import {LoggerInstance} from "winston";

/**
 * Implementation of {@link CircleCommandService}
 */
@injectable()
export class CircleCommandServiceImpl implements CircleCommandService{

    /**
     * CircleCommandServiceImpl logger
     * @type {winston.LoggerInstance}
     */

    private logger: LoggerInstance = Utils.createLogger(CircleCommandServiceImpl.name);

    /**
     *
     */
    @inject("CircleDao")
private circleDao: CircleDao;

    /**
     * Override
     * @param {string} name
     * @param {string[]} roles
     * @param {string} description
     * @param {string} avatarURL
     * @returns {Promise<number>}
     */
   public async createCircle(name: string , roles: string[],  description?: string, avatarURL?: string): Promise<number>{

   }
}