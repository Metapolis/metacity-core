import "reflect-metadata";
import { AppTestModule } from "./AppTestModule";

/**
 * Abstract controller
 */
export abstract class AbstractTestController {

    /**
     * Application testing
     */
    private static app: AppTestModule;

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
        await AbstractTestController.app.bootstrap();
    }

    /**
     * Method launched before test execution
     */
    public static after(): void {
        AbstractTestController.app.rebind();
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
