/**
 * Contains paginated results
 */
export class ResultList<T> {

    /**
     * Total of available objects
     */
    private total: number;

    /**
     * Object results
     */
    private results: T[];

    /**
     * Construct result list
     * @param total total of available object
     * @param results object results
     */
    constructor(total: number, results: T[]) {
        this.total = total;
        this.results = results;
    }

    /**
     * Sets new Total of available objects.
     *
     * @param total New value of Total of available objects.
     */
    public setTotal(total: number): void {
        this.total = total;
    }

    /**
     * Gets Total of available objects.
     *
     * @return Value of Total of available objects.
     */
    public getTotal(): number {
        return this.total;
    }

    /**
     * Sets new Paginated results.
     *
     * @param results New value of Paginated results.
     */
    public setResults(results: T[]): void {
        this.results = results;
    }

    /**
     * Gets Paginated results.
     *
     * @return Value of Paginated results.
     */
    public getResults(): T[] {
        return this.results;
    }
}
