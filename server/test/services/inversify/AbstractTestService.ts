import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";

export abstract class AbstractTestService {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Method launched before test execution
     */
    public static before(): void {
        AbstractTestService.app = new AppTestModule();
        AbstractTestService.app.bootstrap();
    }

    /**
     * Method launched before test execution
     */
    public static after(): void {
        AbstractTestService.app.rebind();
    }
}
