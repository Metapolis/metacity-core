import { App } from "../src/App";
import { Container } from "inversify";

/**
 * Context app use to launch just one time server
 */
export class ContextApp {

    /**
     * App Metacity core
     *
     * @type {App}
     */
    public static app: App = new App();

    /**
     * Container inversify
     *
     * @type {Container}
     */
    public static container: Container = ContextApp.app.bootstrap();
}
