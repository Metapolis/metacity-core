import { TweetJsonData } from "./documents/TweetJsonData";
import * as Elasticsearch from "elasticsearch";

/**
 * Search response use to format mocked response of tweet
 */
export class SearchResponseTweet implements Elasticsearch.SearchResponse<TweetJsonData> {
    public took: number;
    public timed_out: boolean;
    public _shards: Elasticsearch.ShardsResponse;
    public hits: { total: number; max_score: number; hits: { _index: string; _type: string; _id: string; _score: number; _source: TweetJsonData; _version: number; _explanation?: Elasticsearch.Explanation; fields?: any; highlight?: any; inner_hits?: any }[] };
}
