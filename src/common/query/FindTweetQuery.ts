
import { LogicalQueryCriteria } from "./LogicalQueryCriteria";
import { Config } from "../../Config";
import { Range } from "../Range";

/**
 * Contains traffic accident search query
 */
export class FindTweetQuery {

    /**
     * Index to search
     *
     * @type {string}
     */
    private index: string = Config.getIndexNameSocialNetwork();

    /**
     * Document type
     * 
     * @type {string}
     */
    private type: string = Config.getDocumentNameTweet();

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
     * Date filter
     */
    private dateFilter: LogicalQueryCriteria<Range<number>>;

    /**
     * Hashtag filter
     */
    private hashtagFilter: LogicalQueryCriteria<string>;

    /**
     * Mention filter
     */
    private mentionFilter: LogicalQueryCriteria<string>;

    /**
     * True means optional parameters are set
     *
     * @returns {boolean} True if one of optional parameter is set
     */
    public isSet(): boolean {
        return this.dateFilter != null
            || this.hashtagFilter != null
            || this.mentionFilter != null;
    }

    /**
     * tweet's date filter getter
     */
    public getDateFilter(): LogicalQueryCriteria<Range<number>> {
        return this.dateFilter;
    }

    /**
     * tweet's date filter setter
     */
    public setDateFilter(dateFilter: LogicalQueryCriteria<Range<number>>) {
        this.dateFilter = dateFilter;
    }

    /**
     * tweet's hashtag filter getter
     */
    public getHashtagFilter(): LogicalQueryCriteria<string> {
        return this.hashtagFilter;
    }

    /**
     * tweet's hashtag filter setter
     */
    public setHashtagFilter(hashTagFilter: LogicalQueryCriteria<string>) {
        this.hashtagFilter = hashTagFilter;
    }

    /**
     * tweet's mention filter getter
     */
    public getMentionFilter(): LogicalQueryCriteria<string> {
        return this.mentionFilter;
    }

    /**
     * tweet's mention filter setter
     */
    public setMentionFilter(mentionFilter: LogicalQueryCriteria<string>) {
        this.mentionFilter = mentionFilter;
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

    /**
     * tweet's type getter
     */
    public getType(): string {
        return this.type;
    }

    /**
     * tweet's index getter
     */
    public getIndex(): string {
        return this.index;
    }
}
