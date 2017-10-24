import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";
import { Container } from "inversify";
import { TrafficQueryService } from "../../../src/services/query/TrafficQueryService";
import { TweetQueryService } from "../../../src/services/query/TweetQueryService";
import { UserAuthenticationQueryService } from "../../../src/services/query/UserAuthenticationQueryService";
import { UserQueryService } from "../../../src/services/query/UserQueryService";
import { CircleCommandService } from "../../../src/services/command/CircleCommandService";
import { CircleQueryService } from "../../../src/services/query/CircleQueryService";
import { UserCommandService } from "../../../src/services/command/UserCommandService";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import * as TypeMoq from "typemoq";


/**
 * Abstract controller
 */
export abstract class AbstractTestController {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Application testing
     */
    private static container: Container;

    /**
     * Backend
     *
     * @type {string}
     */
    private static backend: string = "http://localhost:3000";

    /**
     * Method launched before test execution
     */
    public static async before(): Promise<void> {
        AbstractTestController.app = new AppTestModule();
        AbstractTestController.container = await AbstractTestController.app.bootstrap();
    }

    /**
     * Method launched before test execution
     */
    public static after(): void {
        AbstractTestController.app.rebind();
    }

    /**
     * Use to rest all mock after each test
     */
    public after(): void {
        // Reset all mock services
        (AbstractTestController.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>).reset();
        (AbstractTestController.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>).reset();
        (AbstractTestController.container.get("UserAuthenticationQueryServiceMock") as TypeMoq.IMock<UserAuthenticationQueryService>).reset();
        (AbstractTestController.container.get("UserQueryServiceMock") as TypeMoq.IMock<UserQueryService>).reset();
        (AbstractTestController.container.get("CircleCommandServiceMock") as TypeMoq.IMock<CircleCommandService>).reset();
        (AbstractTestController.container.get("CircleQueryServiceMock") as TypeMoq.IMock<CircleQueryService>).reset();
        (AbstractTestController.container.get("UserCommandServiceMock") as TypeMoq.IMock<UserCommandService>).reset();
        (AbstractTestController.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>).reset();
        (AbstractTestController.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>).reset();
        (AbstractTestController.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>).reset();
    }

    /**
     * Get backend
     *
     * @returns {string}
     */
    public static getBackend(): string {
        return this.backend;
    }
}
