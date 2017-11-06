import { LogicalQueryCriteria } from "./LogicalQueryCriteria";

/**
 * Contains user search query
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
     * Q filter (Free text filter)
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
     * Free text filter getter
     */
    public getQFilter(): LogicalQueryCriteria<string> {
        return this.qFilter;
    }

    /**
     * Free text filter setter
     */
    public setQFilter(qFilter: LogicalQueryCriteria<string>) {
        this.qFilter = qFilter;
    }

    /**
     * user's limit getter
     */
    public getLimit(): number {
        return this.limit;
    }

    /**
     * user's limit setter
     */
    public setLimit(limit: number) {
        this.limit = limit;
    }

    /**
     * user's offset getter
     */
    public getOffset(): number {
        return this.offset;
    }

    /**
     * user's offset setter
     */
    public setOffset(offset: number) {
        this.offset = offset;
    }
}
