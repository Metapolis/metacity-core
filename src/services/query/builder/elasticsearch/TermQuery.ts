import { Query } from "./Query";
import { ValueTerm } from "./model/ValueTerm";

export class TermQuery implements Query {
    /**
     * Term map containing field => value
     * @type {Map<string, ValueTerm>}
     */
    private term: Map<string, ValueTerm> = new Map<string, ValueTerm>();

    /**
     * Constructor
     * @param field
     * @param value
     */
    constructor(field: string, value: number | string) {
        const valueTerm = new ValueTerm(value);
        this.term.set(field, valueTerm);
    }

    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"term\" : {";
        for ( let key of this.term.keys() ){
            strQuery += "\"" + key + "\": " + this.term.get(key).render();
        }
        strQuery += "}}";
        return strQuery;
    }
}
