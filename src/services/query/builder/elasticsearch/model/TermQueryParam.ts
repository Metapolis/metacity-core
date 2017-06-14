import { QueryParam } from "./QueryParam";

/**
 * Contains all information to build term query
 */
export class TermQueryParam extends QueryParam {

    /**
     * Value to search
     */
    public value: number | string;

    /**
     * Constructor
     *
     * @param field field used to search
     * @param value value to search
     */
    constructor(field: string, value: number | string) {
        super();
        this.field = field;
        this.value = value;
    }
}