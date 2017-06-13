
import {QueryParam} from "./QueryParam";

/**
 * Contains all information to build term query
 */
export class TermQueryParam extends QueryParam {

    /**
     * Value to search
     */
    public value: number | string;
}