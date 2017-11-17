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
