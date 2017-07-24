import "reflect-metadata";
import { Client, SearchParams } from "elasticsearch";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AbstractTestService } from "../inversify/AbstractTestService";
import { TweetQueryService } from "../../../src/services/query/TweetQueryService";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { FindTweetQuery } from "../../../src/common/query/FindTweetQuery";
import SearchResponse = Elasticsearch.SearchResponse;
import { TweetData } from "./elastic/TweetData";
import { TweetDTO } from "../../../src/services/query/dto/tweet/TweetDTO";
import { ResultList } from "../../../src/common/ResultList";
import { SearchResponseTweet } from "./elastic/SearchResponseTweet";
import { TweetJsonData } from "./elastic/documents/TweetJsonData";
import * as Chai from "chai";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { TweetType } from "../../../src/common/enum/tweet/TweetType";
import { TweetCategory } from "../../../src/common/enum/tweet/TweetCategory";
import { Range } from "../../../src/common/Range";
import { LogicalQueryCriteria } from "../../../src/common/query/LogicalQueryCriteria";

/**
 * All test for tweet query service
 */
@suite
class TweetQueryServiceTest extends AbstractTestService {

    /**
     * Test function find tweet tweet
     */
    @test
    private async testFindTweets(): Promise<void> {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);
        const esClient: TypeMoq.IMock<Client> = (ContextApp.container.get("ESClientMock") as TypeMoq.IMock<Client>);

        const findTweetsQuery: FindTweetQuery = new FindTweetQuery();
        findTweetsQuery.setOffset(0);
        findTweetsQuery.setLimit(20);

        const mockTweet: SearchResponseTweet = new SearchResponseTweet();
        Object.assign(mockTweet, TweetData.tweets);

        esClient.setup((instance) => instance.search<TweetJsonData>(TypeMoq.It.isAny())).returns(() => Promise.resolve(mockTweet));

        let careTweetDTOs: ResultList<TweetDTO> = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === undefined;

            return ret;
        })), TypeMoq.Times.once());

        // With dates in query
        // Just Must
        const mustGeoShape: Array<Range<number>> = [];
        mustGeoShape.push(new Range<number>(1, 2));
        mustGeoShape.push(new Range<number>(3, 4));
        findTweetsQuery.setDateFilter(new LogicalQueryCriteria<Range<number>>(mustGeoShape, []));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"range\" : {\"createdAt\": {\"gte\":1,\"lt\":2}}},{\"range\" : {\"createdAt\": {\"gte\":3,\"lt\":4}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Just should
        const shouldGeoShape: Array<Range<number>> = [];
        shouldGeoShape.push(new Range<number>(7, 8));
        shouldGeoShape.push(new Range<number>(9, 12));
        findTweetsQuery.setDateFilter(new LogicalQueryCriteria<Range<number>>([], shouldGeoShape));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"should\": [{\"range\" : {\"createdAt\": {\"gte\":7,\"lt\":8}}},{\"range\" : {\"createdAt\": {\"gte\":9,\"lt\":12}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Should and must
        findTweetsQuery.setDateFilter(new LogicalQueryCriteria<Range<number>>(mustGeoShape, shouldGeoShape));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"range\" : {\"createdAt\": {\"gte\":1,\"lt\":2}}},{\"range\" : {\"createdAt\": {\"gte\":3,\"lt\":4}}}]\"should\": [{\"range\" : {\"createdAt\": {\"gte\":7,\"lt\":8}}},{\"range\" : {\"createdAt\": {\"gte\":9,\"lt\":12}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());
        findTweetsQuery.setDateFilter(null);

        // With mentions in query
        // Just Must
        const mustMention: string[] = [];
        mustMention.push("stark");
        mustMention.push("tony");
        findTweetsQuery.setMentionFilter(new LogicalQueryCriteria<string>(mustMention, []));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"term\" : {\"mentions\": {\"value\":\"stark\"}}},{\"term\" : {\"mentions\": {\"value\":\"tony\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Just should
        const shouldMention: Array<string> = [];
        shouldMention.push("should stark");
        shouldMention.push("should tony");
        findTweetsQuery.setMentionFilter(new LogicalQueryCriteria<string>([], shouldMention));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"should\": [{\"term\" : {\"mentions\": {\"value\":\"should stark\"}}},{\"term\" : {\"mentions\": {\"value\":\"should tony\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Should and must
        findTweetsQuery.setMentionFilter(new LogicalQueryCriteria<string>(mustMention, shouldMention));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"term\" : {\"mentions\": {\"value\":\"stark\"}}},{\"term\" : {\"mentions\": {\"value\":\"tony\"}}}]\"should\": [{\"term\" : {\"mentions\": {\"value\":\"should stark\"}}},{\"term\" : {\"mentions\": {\"value\":\"should tony\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());
        findTweetsQuery.setMentionFilter(null);

        // With hashtags in query
        // Just Must
        const mustHashtag: string[] = [];
        mustHashtag.push("starkhash");
        mustHashtag.push("tonyhash");
        findTweetsQuery.setHashtagFilter(new LogicalQueryCriteria<string>(mustHashtag, []));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"term\" : {\"hashtags\": {\"value\":\"starkhash\"}}},{\"term\" : {\"hashtags\": {\"value\":\"tonyhash\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Just should
        const shouldHashtag: Array<string> = [];
        shouldHashtag.push("should starkhash");
        shouldHashtag.push("should tonyhash");
        findTweetsQuery.setHashtagFilter(new LogicalQueryCriteria<string>([], shouldHashtag));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"should\": [{\"term\" : {\"hashtags\": {\"value\":\"should starkhash\"}}},{\"term\" : {\"hashtags\": {\"value\":\"should tonyhash\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());

        // Should and must
        findTweetsQuery.setHashtagFilter(new LogicalQueryCriteria<string>(mustHashtag, shouldHashtag));
        careTweetDTOs = (await tweetQueryService.findTweets(findTweetsQuery));

        for (let i = 0; i < TweetData.tweets.hits.hits.length; i++) {
            const tweetJson: TweetJsonData = new TweetJsonData();
            Object.assign(tweetJson, TweetData.tweets.hits.hits[i]._source);
            this.assertTweet(careTweetDTOs.results[i], tweetJson);
        }

        esClient.verify((instance) => instance.search(TypeMoq.It.is((searchParams: SearchParams) => {
            let ret: boolean = searchParams.index === findTweetsQuery.getIndex();
            ret = ret && searchParams.type === findTweetsQuery.getType();
            ret = ret && searchParams.size === findTweetsQuery.getLimit();
            ret = ret && searchParams.from === findTweetsQuery.getOffset();
            ret = ret && searchParams.body === "{ \"query\":{\"bool\" : {\"must\": [{\"term\" : {\"hashtags\": {\"value\":\"starkhash\"}}},{\"term\" : {\"hashtags\": {\"value\":\"tonyhash\"}}}]\"should\": [{\"term\" : {\"hashtags\": {\"value\":\"should starkhash\"}}},{\"term\" : {\"hashtags\": {\"value\":\"should tonyhash\"}}}]}}}";

            return ret;
        })), TypeMoq.Times.once());
    }

    @test
    private async testFindTweetsQueryNull() {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);

        await tweetQueryService.findTweets(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Query cannot be null");
        });
    }

    @test
    private async testFindTweetsQueryOffsetNull() {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);

        const findTweetsQuery: FindTweetQuery = new FindTweetQuery();
        findTweetsQuery.setOffset(null);

        await tweetQueryService.findTweets(findTweetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset must be set");
        });
    }

    @test
    private async testFindTweetsQueryOffsetNegative() {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);

        const findTweetsQuery: FindTweetQuery = new FindTweetQuery();
        findTweetsQuery.setOffset(-1);

        await tweetQueryService.findTweets(findTweetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset cannot be negative");
        });
    }

    @test
    private async testFindTweetsQueryLimitNull() {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);

        const findTweetsQuery: FindTweetQuery = new FindTweetQuery();
        findTweetsQuery.setLimit(null);

        await tweetQueryService.findTweets(findTweetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be set");
        });
    }

    @test
    private async testFindTweetsQueryLimitZero() {
        const tweetQueryService: TweetQueryService = (ContextApp.container.get("TweetQueryService") as TweetQueryService);

        const findTweetsQuery: FindTweetQuery = new FindTweetQuery();
        findTweetsQuery.setLimit(0);

        await tweetQueryService.findTweets(findTweetsQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be superior to zero");
        });
    }

    /**
     * Check equality into elastic search stocked tweet and tweet dto
     * @param actual
     * @param expected
     */
    private assertTweet(actual: TweetDTO, expected: TweetJsonData) {
        Chai.assert.equal(actual.getId(), Number(expected.id), "Expected same identifier");
        Chai.assert.equal(TweetType[TweetType[actual.getType()]], TweetType[expected.type], "Expected same tweet type");
        Chai.assert.equal(TweetCategory[TweetCategory[actual.getCategory()]], TweetCategory[expected.category], "Expected same tweet category");
        Chai.assert.equal(actual.getText(), expected.text, "Expected same text");
        Chai.assert.equal(actual.getCreatedAt(), expected.createdAt, "Expected same created at");
        Chai.assert.equal(actual.getFeeling(), expected.feeling, "Expected same feeling");
        Chai.assert.equal(actual.getPseudo(), expected.pseudo, "Expected same pseudo");
        Chai.assert.equal(actual.getHashtags().length, expected.hashtags.length, "Expected same hashtags");
        for (let i = 0; i < expected.hashtags.length; i++) {
            Chai.assert.equal(actual.getHashtags()[i], expected.hashtags[i], "Expected same hashtags");
        }
        Chai.assert.equal(actual.getMentions().length, expected.mentions.length, "Expected same mentions");
        for (let i = 0; i < expected.hashtags.length; i++) {
            Chai.assert.equal(actual.getMentions()[i], expected.mentions[i], "Expected same mentions");
        }
        Chai.assert.equal(actual.getTags().length, expected.tags.length, "Expected same tags");
        for (let i = 0; i < expected.tags.length; i++) {
            Chai.assert.equal(actual.getTags()[i], expected.tags[i], "Expected same tags");
        }
    }
}

