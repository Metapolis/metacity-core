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

import { BoundingBoxQuery } from "./BoundingBoxQuery";
import { Query } from "./Query";
import { BoolQuery } from "./BoolQuery";
import { TermQuery } from "./TermQuery";
import { RangeQuery } from "./RangeQuery";
import { MatchAllQuery } from "./MatchAllQuery";
import { QueryParam } from "./model/QueryParam";
import { TermQueryParam } from "./model/TermQueryParam";
import { RangeQueryParam } from "./model/RangeQueryParam";
import { BoundingBoxQueryParam } from "./model/BoundingBoxQueryParam";

/**
 * Contains methods to build an elasticsearch query
 */
export class QueryBuilder {

    /**
     * Map containing the final query
     * @type {Map<string, Query>}
     */
    private query: Map<string, Query> = new Map<string, Query>();

    /**
     * Bool query use to aggregate all query
     *
     * @type {BoolQuery}
     */
    private bool: BoolQuery;

    /**
     * True mean bool is set with bool query
     *
     * @type {boolean}
     */
    private hasBool: boolean = false;

    /**
     * Create an inner query (use to add in bool query)
     *
     * @param queryParam query definition
     * @returns {Query}
     */
    private innerQuery(queryParam: QueryParam): Query {
        let innerQuery: Query;
        switch (queryParam.constructor) {
            case TermQueryParam: {
                const termParam: TermQueryParam = queryParam as TermQueryParam;
                innerQuery = new TermQuery(
                    termParam.field,
                    termParam.value);
                break;
            }
            case RangeQueryParam: {
                const rangeParam: RangeQueryParam = queryParam as RangeQueryParam;
                innerQuery = new RangeQuery(
                    rangeParam.field,
                    rangeParam);
                break;
            }
            case BoundingBoxQueryParam: {
                const boundingBoxParam: BoundingBoxQueryParam = queryParam as BoundingBoxQueryParam;
                innerQuery = new BoundingBoxQuery(
                    boundingBoxParam.field,
                    boundingBoxParam.topLeft,
                    boundingBoxParam.bottomRight
                );
                break;
            }
            default: {
                innerQuery = new MatchAllQuery();
            }
        }
        return innerQuery;
    }

    /**
     * Build a bounding box query
     *
     * @param boundingBoxParam bounding box parameter
     *
     * @returns {QueryBuilder}
     */
    public boundingBoxQuery(boundingBoxParam: BoundingBoxQueryParam): QueryBuilder {
        const boundingBoxQuery = new BoundingBoxQuery(boundingBoxParam.field,
            boundingBoxParam.topLeft,
            boundingBoxParam.bottomRight);
        this.query.set("query", boundingBoxQuery);
        return this;
    }

    /**
     * Build the bool query
     *
     * @returns {QueryBuilder}
     */
    public boolQuery() {
        this.bool = new BoolQuery();
        this.hasBool = true;
        this.query.set("query", this.bool);
        return this;
    }

    /**
     * Create new term query
     *
     * @param termParam term query parameter
     *
     * @returns {QueryBuilder}
     */
    public termQuery(termParam: TermQueryParam) {
        const termQuery = new TermQuery(termParam.field, termParam.value);
        this.query.set("query", termQuery);
        return this;
    }

    /**
     * Create new range query
     *
     * @param rangeParam range query parameter
     *
     * @returns {QueryBuilder}
     */
    public rangeQuery(rangeParam: RangeQueryParam) {
        const rangeQuery = new RangeQuery(rangeParam.field, rangeParam);
        this.query.set("query", rangeQuery);
        return this;
    }

    /**
     * Create a match all query
     *
     * @returns {QueryBuilder}
     */
    public matchAllQuery() {
        const matchAllQuery = new MatchAllQuery();
        this.query.set("query", matchAllQuery);
        return this;
    }

    /**
     * Create query on must section in bool query
     *
     * @param queryParam query param to create right query to add
     *
     * @returns {QueryBuilder}
     */
    public must(queryParam: QueryParam) {
        if (!this.hasBool) {
            this.boolQuery();
        }
        this.bool.must(this.innerQuery(queryParam));
        return this;
    }

    /**
     * Create query on should section in bool query
     *
     * @param queryParam query param to create right query to add
     *
     * @returns {QueryBuilder}
     */
    public should(queryParam: QueryParam) {
        if (!this.hasBool) {
            this.boolQuery();
        }
        this.bool.should(this.innerQuery(queryParam));
        return this;
    }

    /**
     * Query builder function
     * @returns {string}
     */
    public build(): string {
        if (this.query.get("query") !== undefined) {
            return "{ \"query\":" + this.query.get("query").render() + "}";
        } else {
            return undefined;
        }
    }
}
