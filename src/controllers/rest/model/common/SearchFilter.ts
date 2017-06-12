
import { Utils } from "../../../../common/Utils";

/**
 * Represent a filter used in search
 */
export class SearchFilter {

    /**
     * Split must and should value
     *
     * @type {string}
     */
    private static MAIN_SPLITTER_CHAR: string = ";";

    /**
     * Minimum main part element (MUST, SHOULD)
     *
     * @type {number}
     */
    private static MAXIMUM_MAIN_PART: number = 2;

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
        const splittedElements: string[] = query.split(SearchFilter.MAIN_SPLITTER_CHAR);
        Utils.checkArgument(splittedElements.length <= SearchFilter.MAXIMUM_MAIN_PART, "SearchQuery has not enough main elements");

        this.mustValues = this.mustValues.concat(splittedElements[0].split(SearchFilter.EXPRESSION_SPLITTER_CHAR));
        if (splittedElements.length === SearchFilter.MAXIMUM_MAIN_PART) {
            this.shouldValues = this.shouldValues.concat(splittedElements[1].split(SearchFilter.EXPRESSION_SPLITTER_CHAR));
        }
    }

    /**
     * Must values getter
     * 
     * @returns {string[]}
     */
    public getMustValues(): string[] {
        return this.mustValues;
    }

    /**
     * Should values getter
     *
     * @returns {string[]}
     */
    public getShouldValues(): string[] {
        return this.shouldValues;
    }
}
