import { Container } from "inversify";

/**
 * Context app use to launch just one time server
 */
export class ContextApp {

    /**
     * Container inversify
     *
     * @type {Container}
     */
    private static container: Container;

    /**
     * Getter of container
     *
     * @returns {Container}
     */
    public static getContainer() {
        return ContextApp.container;
    }

    /**
     * Setter of container
     *
     * Only set by App.ts
     *
     * @param container
     */
    public static setContainer(container: Container) {
        ContextApp.container = container;
    }
}
