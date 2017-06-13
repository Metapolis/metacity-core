import { Query } from "./Query";
import { RangeTerm } from "./model/RangeTerm";
import {RangeQueryParam} from "./model/RangeQueryParam";

export class RangeQuery implements Query {
    /**
     *
     * @type {Map<string, RangeTerm>}
     */
    private range: Map<string, RangeTerm> = new Map<string, RangeTerm>();

    /**
     * Constructor
     * @param field
     * @param rangeQueryParam
     */
    constructor(field: string, rangeQueryParam: RangeQueryParam) {
        const rangeTerm = new RangeTerm(rangeQueryParam);
        this.range.set(field, rangeTerm);
    }

    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"range\" : {";
        for ( const key of this.range.keys() ){
            strQuery += "\"" + key + "\": " + this.range.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
