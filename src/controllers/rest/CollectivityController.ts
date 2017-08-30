import { Controller, Delete, Get, interfaces, Next, Post, RequestBody, RequestParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import * as Express from "express";
import { SaveCircleCommandDTO } from  "../../services/command/dto/circles/SaveCircleCommandDTO";
import {CircleCommandService} from "../../services/command/CircleCommandService";
import { RequestAccessor } from "../../RequestAccessor";
/**
 * API resources to circle creation service
 */
@Controller("/api/collectivity/id/circles");
@injectable()
export class CollectivityController implements interfaces.Controller {
    private logger: LoggerInstance = Utils.createLogger(CollectivityController.name);

    @inject("CircleCommandService")
    private CircleCommandService: CircleCommandService;

    @Post("/:accessKey/circles")
    private create(@RequestParam("accessKey") accessKey: string, @response() res: express.Response): Promise<void> {

    }
    public async createCollectivityCircle(@RequestBody() ) {

    }
}
