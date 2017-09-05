import * as Elasticsearch from "elasticsearch";
import { AccidentJsonData } from "./documents/AccidentJsonData";

/**
 * Search response use to format mocked response of accident
 */
export class SearchResponseAccident implements Elasticsearch.SearchResponse<AccidentJsonData> {
    public took: number;
    public timed_out: boolean;
    public _shards: Elasticsearch.ShardsResponse;
    public hits: { total: number; max_score: number; hits: { _index: string; _type: string; _id: string; _score: number; _source: AccidentJsonData; _version: number; _explanation?: Elasticsearch.Explanation; fields?: any; highlight?: any; inner_hits?: any }[] };
}
