import {BoundingBoxQuery} from "./BoundingBoxQuery";
import {Query} from "./Query";
import {BoolQuery} from "./BoolQuery";
import {TermQuery} from "./TermQuery";
// import { TermsQuery } from "./TermsQuery";
import {RangeQuery} from "./RangeQuery";
// import { MatchQuery } from "./MatchQuery";
import {MatchAllQuery} from "./MatchAllQuery";
import {QueryParam} from "./model/QueryParam";
import {TermQueryParam} from "./model/TermQueryParam";
import {RangeQueryParam} from "./model/RangeQueryParam";
import {BoundingBoxQueryParam} from "./model/BoundingBoxQueryParam";
import {Utils} from "../../../../common/Utils";

/**
 * Contains methods to build an elasticsearch query
 */

export class QueryBuilder {
    /**
     * Map containing the final query
     * @type {Map<string, Query>}
     */
    private query: Map<string, Query> = new Map<string, Query>();
    private bool: BoolQuery;
    private hasBool: boolean = false;

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
     * @param boundingBoxParam
     * @returns {QueryBuilder}
     */
    public boundingBoxQuery(boundingBoxParam: BoundingBoxQueryParam): QueryBuilder {
        const boundingBoxQuery = new BoundingBoxQuery(boundingBoxParam.field,
            boundingBoxParam.topLeft,
            boundingBoxParam.bottomRight);
        this.query.set("query", boundingBoxQuery);
        return this;
    }

    public boolQuery() {
        this.bool = new BoolQuery();
        this.hasBool = true;
        return this;
    }

    public termQuery(termParam: TermQueryParam) {
        const termQuery = new TermQuery(termParam.field, termParam.value);
        this.query.set("query", termQuery);
        return this;
    }

    public rangeQuery(rangeParam: RangeQueryParam) {
        const rangeQuery = new RangeQuery(rangeParam.field, rangeParam);
        this.query.set("query", rangeQuery);
        return this;
    }

    public matchAllQuery() {
        const matchAllQuery = new MatchAllQuery();
        this.query.set("query", matchAllQuery);
        return this;
    }

    public must(queryParam: QueryParam) {
        Utils.checkArguments(this.hasBool, "Cannot be construct query without bool query");
        this.bool.must(this.innerQuery(queryParam));
        return this;
    }

    public should(queryParam: QueryParam) {
        Utils.checkArguments(this.hasBool, "Cannot be construct query without bool query");
        this.bool.should(this.innerQuery(queryParam));
        return this;
    }

    /**
     * Query builder function
     * @returns {string}
     */
    public build(): string {
        return "{ \"query\":" + this.query.get("query").render() + "}";
    }
}
