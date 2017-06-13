/**
 * Represents { "value": "Toto" } for e.g.
 */
export class ValueTerm {
    /**
     * Value of the field
     */
    private value: number | string;

    /**
     * Constructor of the class
     * @param value
     */
    constructor(value: number | string) {
        this.value = value;
    }

    /**
     * Return the json { "value": "Toto" }
     * @returns {string}
     */
    public render(): string {
        const jsonQuery = {
            value: this.value
        };
        return JSON.stringify(jsonQuery);
    }
}
