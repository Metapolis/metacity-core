import "reflect-metadata";
import {suite} from "mocha-typescript";
import {AppTestModule} from "./AppTestModule";

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
    private static backend: string = "http://127.0.0.1:3000";

    /**
     * Method launched before test execution
     */
    public static before(): void {
        AbstractTestController.app = new AppTestModule();
        AbstractTestController.app.bootstrap();
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
