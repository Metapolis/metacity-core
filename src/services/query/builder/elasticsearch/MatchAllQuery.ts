import { Query } from "./Query";

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
