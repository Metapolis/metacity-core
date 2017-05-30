import { Utils } from "../Utils";

/**
 * Represents a logical criteria generally used to filtered queries
 */
export class LogicalQueryCriteria<T> {

    /**
     * Must params
     */
    private mustParams: T[];

    /**
     * Should params
     */
    private shouldParams: T[];

    /**
     * Constructs logical criteria
     *
     * @param mustParams parameters that must appear
     * @param shouldParams parameters that should appear
     */
    constructor(mustParams: T[], shouldParams: T[]) {
        Utils.checkArguments(mustParams != null && shouldParams != null, "Parameters cannot be null");

        this.mustParams = mustParams;
        this.shouldParams = shouldParams;
    }

    /**
     * Gets Parameters that should appear
     *
     * @return Value of Parameters that should appear
     */
    public getShouldParams(): T[] {
        return this.shouldParams;
    }

    /**
     * Gets Parameters that must appear
     *
     * @return Value of Parameters that must appear
     */
    public getMustParams(): T[] {
        return this.mustParams;
    }
}
