import { TweetQueryService } from "../TweetQueryService";
import { inject, injectable } from "inversify";
import { FindTweetQuery } from "../../../common/query/FindTweetQuery";
import { ResultList } from "../../../common/ResultList";
import { TweetDTO } from "../dto/tweet/TweetDTO";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { QueryBuilder } from "../builder/elasticsearch/QueryBuilder";
import { RangeQueryParam } from "../builder/elasticsearch/model/RangeQueryParam";
import { TermQueryParam } from "../builder/elasticsearch/model/TermQueryParam";

/**
 * Implementation of {@link TweetQueryService}
 */
@injectable()
export class TweetQueryServiceImpl implements TweetQueryService {

    /**
     * TweetQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TweetQueryServiceImpl.name);

    /**
     * Tweet querying service
     */
    @inject("ESClient")
    private esClient: Client;

    /**
     * Override
     *
     * @param query
     */
    public async findTweets(query: FindTweetQuery): Promise<ResultList<TweetDTO>> {
        this.logger.info("Retrieve tweets in elastic search");
        Utils.checkArgument(query != null, "Query cannot be null");
        Utils.checkArgument(query.getOffset() != null, "Offset must be set");
        Utils.checkArgument(query.getOffset() >= 0, "Offset cannot be negative");
        Utils.checkArgument(query.getLimit() != null, "Limit must be set");
        Utils.checkArgument(query.getLimit() > 0, "Limit must be superior to zero");

        // Create query builder
        const queryBuilder: QueryBuilder = new QueryBuilder();
        if (query.isSet()) {
            // Create date range filter
            if (query.getDateFilter()) {
                for (const dateRange of query.getDateFilter().getMustParams()) {
                    const rangeQuery: RangeQueryParam = new RangeQueryParam();
                    rangeQuery.field = "createdAt";
                    rangeQuery.createGTELTNumber(dateRange.getStart(), dateRange.getEnd());
                    queryBuilder.must(rangeQuery);
                }
                for (const dateRange of query.getDateFilter().getShouldParams()) {
                    const rangeQuery: RangeQueryParam = new RangeQueryParam();
                    rangeQuery.field = "createdAt";
                    rangeQuery.createGTELTNumber(dateRange.getStart(), dateRange.getEnd());
                    queryBuilder.should(rangeQuery);
                }
            }

            // Create mention filter
            if (query.getMentionFilter()) {
                for (const mention of query.getMentionFilter().getMustParams()) {
                    queryBuilder.must(new TermQueryParam("mentions", mention));
                }
                for (const mention of query.getMentionFilter().getShouldParams()) {
                    queryBuilder.should(new TermQueryParam("mentions", mention));
                }
            }

            // Create hashtag filter
            if (query.getHashtagFilter()) {
                for (const hashtag of query.getHashtagFilter().getMustParams()) {
                    queryBuilder.must(new TermQueryParam("hashtags", hashtag));
                }
                for (const hashtag of query.getHashtagFilter().getShouldParams()) {
                    queryBuilder.should(new TermQueryParam("hashtags", hashtag));
                }
            }
            this.logger.info("Query elastic : '%s'", queryBuilder.build());
        }

        // Call elastic with query
        const jsonTweets = (await this.esClient.search({
            index: query.getIndex(),
            type: query.getType(),
            size: query.getLimit(),
            from: query.getOffset(),
            body: queryBuilder.build()
        })).hits;

        // Parse result to DTO
        const accidents: TweetDTO[] = [];
        for (const jsonTweet of jsonTweets.hits) {
            accidents.push(new TweetDTO(jsonTweet._source as { type: string, category: string }));
        }

        return new ResultList<TweetDTO>(jsonTweets.total, accidents);
    }
}
