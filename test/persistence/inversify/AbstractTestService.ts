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
    public static before(): void {
        AbstractTestDao.app = new AppTestModule();
        AbstractTestDao.app.bootstrap();
    }

    /**
     * Reconnect database, use to isolate context for each test
     */
    public async after(): Promise<void> {
        await AbstractTestDao.app.reconnectDB();
    }
}
