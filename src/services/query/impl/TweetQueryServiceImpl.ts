import { TweetQueryService } from "../TweetQueryService";
import { inject, injectable } from "inversify";
import { FindTweetQuery } from "../../../common/query/FindTweetQuery";
import { ResultList } from "../../../common/ResultList";
import { TweetDTO } from "../dto/tweet/TweetDTO";
import { Client } from "elasticsearch";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";

/**
 * Implementation of {@link TrafficQueryService}
 */
@injectable()
export class TweetQueryServiceImpl implements TweetQueryService {

    /**
     * TrafficQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(TweetQueryServiceImpl.name);

    /**
     * Traffic querying service
     */
    @inject("ESClient")
    private esClient: Client;

    /**
     * Override
     * @param query
     */
    public async findTweets(query: FindTweetQuery): Promise<ResultList<TweetDTO>> {
        this.logger.info("Retrieve all traffic accident in elastic search");
        const jsonTweets = (await this.esClient.search({
            index: query.getIndex(),
            type: query.getType(),
            size: query.getLimit(),
            from: query.getOffset()
        })).hits;

        const accidents: TweetDTO[] = [];
        for (const jsonTweet of jsonTweets.hits) {
            accidents.push(new TweetDTO(jsonTweet._source as {type: string, category: string}));
        }

        return new ResultList<TweetDTO>(jsonTweets.total, accidents);
    }
}
