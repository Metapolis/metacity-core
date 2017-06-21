import { RangeTerm } from "./model/RangeTerm";
import { RangeQueryParam } from "./model/RangeQueryParam";
import { Query } from "./Query";

/**
 * Range query to check if element is inner start and end element (lt(e) > element > gt(e))
 */
export class RangeQuery implements Query {

    /**
     * Map of term per field
     * @type {Map<string, RangeTerm>}
     */
    private range: Map<string, RangeTerm> = new Map<string, RangeTerm>();

    /**
     * Constructor
     *
     * @param field search field query
     * @param rangeQueryParam range query param used to build query
     */
    constructor(field: string, rangeQueryParam: RangeQueryParam) {
        const rangeTerm = new RangeTerm(rangeQueryParam);
        this.range.set(field, rangeTerm);
    }

    /**
     * render function
     *
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"range\" : {";
        for (const key of this.range.keys()) {
            strQuery += "\"" + key + "\": " + this.range.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
