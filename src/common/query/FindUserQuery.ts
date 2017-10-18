import { LogicalQueryCriteria } from "./LogicalQueryCriteria";

/**
 * Contains user accident search query
 */
export class FindUserQuery {

    /**
     * Query limit (default 100)
     *
     * @type {number}
     */
    private limit: number = 100;

    /**
     * Query offset (default 0)
     * @type {number}
     */
    private offset: number = 0;

    /**
     * Q filter (text filter)
     */
    private qFilter: LogicalQueryCriteria<string>;

    /**
     * True means optional parameters are set
     *
     * @returns {boolean} True if one of optional parameter is set
     */
    public isSet(): boolean {
        return this.qFilter != null;
    }

    /**
     * tweet's mention filter getter
     */
    public getQFilter(): LogicalQueryCriteria<string> {
        return this.qFilter;
    }

    /**
     * tweet's mention filter setter
     */
    public setQFilter(qFilter: LogicalQueryCriteria<string>) {
        this.qFilter = qFilter;
    }

    /**
     * tweet's limit getter
     */
    public getLimit(): number {
        return this.limit;
    }

    /**
     * tweet's limit setter
     */
    public setLimit(limit: number) {
        this.limit = limit;
    }

    /**
     * tweet's offset getter
     */
    public getOffset(): number {
        return this.offset;
    }

    /**
     * tweet's offset setter
     */
    public setOffset(offset: number) {
        this.offset = offset;
    }
}
