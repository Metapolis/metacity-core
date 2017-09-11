import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";

export abstract class AbstractTestDao {

    /**
     * Application testing
     */
    private static app: AppTestModule;

    /**
     * Method launched before test execution
     */
    public before(): void {
        AbstractTestDao.app = new AppTestModule();
        AbstractTestDao.app.bootstrap();
    }
}
