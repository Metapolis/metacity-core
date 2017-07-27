import * as Express from "express";

/**
 * Element to access to request everywhere in application
 */
export class RequestAccessor {

    /**
     * Current request
     */
    private static request: Express.Request;

    /**
     * Getter of request
     * @returns {Express.Request}
     */
    public static getRequest() {
        return RequestAccessor.request;
    }

    /**
     * Setter of request
     *
     * It's forbidden to call this method in other place of App.ts
     *
     * @param request new incoming request
     */
    public static setRequest(request: Express.Request) {
        RequestAccessor.request = request;
    }
}
