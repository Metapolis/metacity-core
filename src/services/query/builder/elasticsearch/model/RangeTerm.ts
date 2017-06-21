import { RangeQueryParam } from "./RangeQueryParam";
/**
 * Represents { "gte": 10, "lte": 20 } for e.g.
 */
export class RangeTerm {
    /**
     * Limit greater than or equals
     */
    private gte: number | string;

    /**
     * Limit lower than or equals
     */
    private lte: number | string;

    /**
     * Limit greater than
     */
    private gt: number | string;

    /**
     * Limit lower than
     */
    private lt: number | string;

    /**
     * Constructor
     *
     * @param rangeQueryParam range query param use to create a range term
     */
    constructor(rangeQueryParam: RangeQueryParam) {
        this.gte = rangeQueryParam.getGTE();
        this.lte = rangeQueryParam.getLTE();
        this.gt = rangeQueryParam.getGT();
        this.lt = rangeQueryParam.getLT();
    }

    /**
     * Generate json from class
     * @returns {string}
     */
    public render(): string {
        const gte = this.gte !== undefined ? this.gte : undefined;
        const gt = this.gt !== undefined ? this.gt : undefined;
        const lte = this.lte !== undefined ? this.lte : undefined;
        const lt = this.lt !== undefined ? this.lt : undefined;

        const jsonQuery = {
            gte: gte,
            lte: lte,
            gt: gt,
            lt: lt
        };
        return JSON.stringify(jsonQuery);
    }
}
