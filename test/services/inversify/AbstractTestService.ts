import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";
import { Container } from "inversify";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { CircleDao } from "../../../src/persistence/dao/CircleDao";
import * as TypeMoq from "typemoq";

export abstract class AbstractTestService {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Application test container
     */
    private static container: Container;

    /**
     * Method launched before test execution
     */
    public static before(): void {
        AbstractTestService.app = new AppTestModule();
        AbstractTestService.container = AbstractTestService.app.bootstrap();
    }

    /**
     * Method launched before test execution
     */
    public static after(): void {
        AbstractTestService.app.rebind();
    }

    /**
     * Use to rest all mock after each test
     */
    public async after(): Promise<void> {
        // Reset all mock services
        (AbstractTestService.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>).reset();
        (AbstractTestService.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>).reset();
        (AbstractTestService.container.get("CircleDaoMock") as TypeMoq.IMock<CircleDao>).reset();
    }
}
