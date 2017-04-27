import "reflect-metadata";
import {suite} from "mocha-typescript";
import {AppTestModule} from "./AppTestModule";

@suite
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
}
