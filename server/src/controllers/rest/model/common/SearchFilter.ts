
export class SearchFilter {

    /**
     * Split must and should value
     *
     * @type {string}
     */
    private static MAIN_SPLITTER_CHAR: string = ";";

    /**
     * Split element in filter
     * @type {string}
     */
    private static EXPRESSION_SPLITTER_CHAR: string = ",";

    /**
     * Logical must values
     *
     * @type {Array}
     */
    private mustValues: string[] = [];

    /**
     * Logical should values
     * @type {Array}
     */
    private shouldValues: string[] = [];

    /**
     * Construct filter from string
     * @param query string to parse
     */
    constructor(query: string) {
        
    }
}
