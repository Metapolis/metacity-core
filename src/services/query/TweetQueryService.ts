import { FindTweetQuery } from "../../common/query/FindTweetQuery";
import { ResultList } from "../../common/ResultList";
import { TweetDTO } from "./dto/tweet/TweetDTO";

/**
 * Contains method to perform tweet query
 */
export interface TweetQueryService {

    /**
     * Retrieves all tweet
     *
     * @param query Query use to find tweet
     *
     * @returns {Promise<ResultList<TweetDTO>>}
     */
    findTweets(query: FindTweetQuery): Promise<ResultList<TweetDTO>>;
}
