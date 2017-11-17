/**
 *    RESTful Metacity API, expose data from stack data
 * Copyright (C) 2017  Metapolis
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * @copyright  Copyright (c) 2017 Metapolis
 * @license    http://opensource.org/licenses/AGPL-3.0 AGPL-3.0
 * @link       https://bitbucket.org/metapolis/metacity-core
 * @since      0.2.0
 */

import { LogicalQueryCriteria } from "./LogicalQueryCriteria";
import { Config } from "../../Config";
import { Range } from "../Range";

/**
 * Contains tweet accident search query
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
