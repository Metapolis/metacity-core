/**
 * Object representation with id and label
 */
export class Labeled {

    /**
     * Identifier
     */
    private id: number;

    /**
     * Label
     */
    private label: string;

    /**
     * Constructor
     *
     * @param id object identifier
     * @param label object label
     */
    constructor(id: number, label: string) {
        this.id = id;
        this.label = label;
    }

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter label
     *
     * @returns {number}
     */
    public getLabel(): string {
        return this.label;
    }

    /**
     * Setter label
     *
     * @param label new label value
     */
    public setLabel(label: string): void {
        this.label = label;
    }

}
