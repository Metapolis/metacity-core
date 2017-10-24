import { Query } from "./Query";

/**
 * Contains bool query fields
 */

export class BoolQuery implements Query {
    /**
     * Bool query definition
     */
    private bool: Map<string, Query[]> = new Map<string, Query[]>();

    /**
     * Must query
     */
    public must(query: Query): void {
        if (!this.bool.has("must")) {
            this.bool.set("must", []);
        }
        this.bool.get("must").push(query);
    }

    /**
     * Should query
     */
    public should(query: Query): void {
        if (!this.bool.has("should")) {
            this.bool.set("should", []);
        }
        this.bool.get("should").push(query);
    }

    /**
     * render function
     * @returns {string}
     */
    public render(): string {
        let strQuery = "{" +
            "\"bool\" : {";
        for (const key of this.bool.keys()) {
            strQuery += "\"" + key + "\": [";
            /*
             Temporary hack cause I have a headache! :P
             */
            let index: number = 0;
            for (const boolTerm of this.bool.get(key)) {
                strQuery += boolTerm.render();
                if (index !== (this.bool.get(key).length - 1)) {
                    index++;
                    strQuery += ",";
                }
            }
            strQuery += "]";
        }
        strQuery += "}}";
        return strQuery;
    }

}
