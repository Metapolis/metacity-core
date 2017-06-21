import { Query } from "./Query";

/**
 * This query match with all elements
 */
export class MatchAllQuery implements Query {
    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        const jsonQuery = {
            match_all: {}
        };
        return JSON.stringify(jsonQuery);
    }
}
