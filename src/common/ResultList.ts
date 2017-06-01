/**
 * Contains paginated results
 */
export class ResultList<T> {

    /**
     * Total of available objects
     */
    public total: number;

    /**
     * Object results
     */
    public results: T[];

    /**
     * Construct result list
     * @param total total of available object
     * @param results object results
     */
    constructor(total: number, results: T[]) {
        this.total = total;
        this.results = results;
    }
}
