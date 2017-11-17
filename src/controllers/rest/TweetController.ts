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

import { Controller, Get, interfaces, QueryParam } from "inversify-express-utils";
import { inject, injectable } from "inversify";
import { LoggerInstance } from "winston";
import { Utils } from "../../common/Utils";
import { SearchFilter } from "./model/common/SearchFilter";
import { LogicalQueryCriteria } from "../../common/query/LogicalQueryCriteria";
import { ResultList } from "../../common/ResultList";
import { Range } from "../../common/Range";
import { RangeUtil } from "../../common/RangeUtil";
import { FindTweetQuery } from "../../common/query/FindTweetQuery";
import { TweetDTO } from "../../services/query/dto/tweet/TweetDTO";
import { Tweet } from "./model/tweet/Tweet";
import { TweetType } from "../../common/enum/tweet/TweetType";
import { TweetQueryService } from "../../services/query/TweetQueryService";
import { TweetCategory } from "../../common/enum/tweet/TweetCategory";
import { ClientControl, UserControl } from "../../common/Decorators";
import { Role } from "../../common/enum/Role";

/**
 * API resources to delivery service to access to traffic element
 *
 * /api/traffics route
 *
 * @class TrafficController
 */
@Controller("/api/tweets")
@injectable()
export class TweetController implements interfaces.Controller {

    /**
     * IndexController logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TweetController.name);

    /**
     * tweet querying service
     */
    @inject("TweetQueryService")
    private tweetQueryService: TweetQueryService;

    /**
     * Get tweets information
     *
     * @param offset result offset
     * @param limit size of return result
     * @param dates dates search filter
     * @param hashtags hash tags search filter
     * @param mentions mentions search filter
     *
     * @returns {Promise<ResultList<Tweet>>}
     */
    @Get("/")
    @ClientControl([Role.READ_ALL])
    public async findAccidents(@QueryParam("offset") offset: number,
                               @QueryParam("limit") limit: number,
                               @QueryParam("dates") dates: string,
                               @QueryParam("hashtags") hashtags: string,
                               @QueryParam("mentions") mentions: string): Promise<ResultList<Tweet>> {
        Utils.checkArgument(offset != null, "Offset must be set");
        Utils.checkArgument(offset >= 0, "Offset cannot be negative");
        Utils.checkArgument(limit != null, "Size must be set");
        Utils.checkArgument(limit > 0, "Size must be superior to zero");

        this.logger.info("Find tweets information");
        let dateSearchFilter: SearchFilter;
        let hashtagSearchFilter: SearchFilter;
        let mentionSearchFilter: SearchFilter;
        if (!Utils.isNullOrEmpty(dates)) {
            dateSearchFilter = new SearchFilter(dates);
        }
        if (!Utils.isNullOrEmpty(hashtags)) {
            hashtagSearchFilter = new SearchFilter(hashtags);
        }
        if (!Utils.isNullOrEmpty(mentions)) {
            mentionSearchFilter = new SearchFilter(mentions);
        }
        const query: FindTweetQuery = new FindTweetQuery();
        query.setOffset(Number(offset));
        query.setLimit(Number(limit));

        // Prepare the date filter
        if (dateSearchFilter != null) {
            const mustParam: Array<Range<number>> = [];
            const shouldParams: Array<Range<number>> = [];

            // Parse must params
            for (const must of dateSearchFilter.getMustValues()) {
                mustParam.push(RangeUtil.createDateRange(must));
            }

            // Parse should params
            for (const should of dateSearchFilter.getShouldValues()) {
                shouldParams.push(RangeUtil.createDateRange(should));
            }

            // Create criteria
            const rangeDateFilter: LogicalQueryCriteria<Range<number>> = new LogicalQueryCriteria<Range<number>>(mustParam, shouldParams);
            query.setDateFilter(rangeDateFilter);
        }

        // Prepare the hash tag filter
        if (hashtagSearchFilter != null) {
            const mustParam: string[] = [];
            const shouldParams: string[] = [];

            // Parse must params
            for (const must of hashtagSearchFilter.getMustValues()) {
                mustParam.push(must);
            }

            // Parse should params
            for (const should of hashtagSearchFilter.getShouldValues()) {
                shouldParams.push(should);
            }

            // Create criteria
            const logicalHashtagFilter: LogicalQueryCriteria<string> = new LogicalQueryCriteria<string>(mustParam, shouldParams);
            query.setHashtagFilter(logicalHashtagFilter);
        }

        // Prepare the mention filter
        if (mentionSearchFilter != null) {
            const mustParam: string[] = [];
            const shouldParams: string[] = [];

            // Parse must params
            for (const must of mentionSearchFilter.getMustValues()) {
                mustParam.push(must);
            }

            // Parse should params
            for (const should of mentionSearchFilter.getShouldValues()) {
                shouldParams.push(should);
            }

            // Create criteria
            const logicalMentionFilter: LogicalQueryCriteria<string> = new LogicalQueryCriteria<string>(mustParam, shouldParams);
            query.setMentionFilter(logicalMentionFilter);
        }

        const resultListTweets: ResultList<TweetDTO> = await this.tweetQueryService.findTweets(query);
        const returnedTweets: Tweet[] = [];

        for (const tweetDTO of resultListTweets.results) {
            const tweet: Tweet = new Tweet();
            tweet.id = tweetDTO.getId();
            tweet.type = TweetType[tweetDTO.getType()];
            tweet.category = TweetCategory[tweetDTO.getCategory()];
            tweet.createdAt = tweetDTO.getCreatedAt();
            tweet.feeling = tweetDTO.getFeeling();
            tweet.hashtags = tweetDTO.getHashtags();
            tweet.tags = tweetDTO.getTags();
            tweet.mentions = tweetDTO.getMentions();
            tweet.pseudo = tweetDTO.getPseudo();
            tweet.text = tweetDTO.getText();

            returnedTweets.push(tweet);
        }

        return new ResultList<Tweet>(resultListTweets.total, returnedTweets);
    }
}
