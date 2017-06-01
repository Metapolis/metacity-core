import { App } from "../src/App";
import { Container } from "inversify";
import { isNullOrUndefined } from "util";

/**
 * Context app use to launch just one time server
 */
export class ContextApp {

    /**
     * App Metacity core
     *
     * @type {App}
     */
    public static app: App;

    /**
     * Container inversify
     *
     * @type {Container}
     */
    public static container: Container;

    public static async init(): Promise<void> {
        if (isNullOrUndefined(ContextApp.container) && isNullOrUndefined(ContextApp.app)) {
            ContextApp.app  = new App();
            ContextApp.container = await ContextApp.app.bootstrap();
        }
    }
}
