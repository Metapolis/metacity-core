/**
 * Represents { "value": ["Toto", "Titan"] } for e.g.
 */
export class ValueTerms {
    /**
     * Value of the field
     */
    private value: string[];

    /**
     * Constructor of the class
     * @param value
     */
    constructor(value: string[]) {
        this.value = value;
    }

    /**
     * Return the json { "value": ["Toto", "Titan"] }
     * @returns {string}
     */
    public render(): string {
        const jsonQuery = {
            value: this.value
        };
        return JSON.stringify(jsonQuery);
    }
}
