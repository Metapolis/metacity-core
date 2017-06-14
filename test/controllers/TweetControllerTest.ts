import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
import { FindTrafficAccidentQuery } from "../../src/common/query/FindTrafficAccidentQuery";
import { ResultList } from "../../src/common/ResultList";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import { TweetQueryService } from "../../src/services/query/TweetQueryService";
import { TweetDTO } from "../../src/services/query/dto/tweet/TweetDTO";
import { TweetCategory } from "../../src/common/enum/tweet/TweetCategory";
import { TweetType } from "../../src/common/enum/tweet/TweetType";
import { TestUtils } from "../common/TestUtils";
import { FindTweetQuery } from "../../src/common/query/FindTweetQuery";
import { Tweet } from "../../src/controllers/rest/model/tweet/Tweet";

/**
 * All test for traffic query service
 */
@suite
class TweetControllerTest extends AbstractTestController {

    /**
     * Test function find traffic accident
     */
    @test
    private async testFindTweets(): Promise<void> {
        const path: string = "/api/tweets";
        const offset: number = 0;
        const limit: number = 20;
        const tweetQueryService: TypeMoq.IMock<TweetQueryService> = (ContextApp.container.get("TweetQueryServiceMock") as TypeMoq.IMock<TweetQueryService>);

        const mockTweets: TweetDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockTweet: TweetDTO = new TweetDTO();
            mockTweet.setId(i);
            mockTweet.setCategory((i % Object.keys(TweetCategory).length + 1) as TweetCategory);
            mockTweet.setType((i % Object.keys(TweetType).length + 1) as TweetType);
            mockTweet.setId(i);
            mockTweet.setCreatedAt(i);
            mockTweet.setFeeling(Math.random());
            mockTweet.setHashtags([TestUtils.randomString(i), TestUtils.randomString(i), TestUtils.randomString(i), TestUtils.randomString(i)]);
            mockTweet.setKeywords([TestUtils.randomString(i + 12), TestUtils.randomString(i + 12), TestUtils.randomString(i + 12), TestUtils.randomString(i + 12)]);
            mockTweet.setMentions([TestUtils.randomString(i + 22), TestUtils.randomString(i + 22), TestUtils.randomString(i + 22), TestUtils.randomString(i + 22)]);
            mockTweet.setText(TestUtils.randomString(140));
            mockTweet.setPseudo(TestUtils.randomString(20));
            mockTweets.push(mockTweet);
        }

        const mockQuery: FindTweetQuery = new FindTweetQuery();
        mockQuery.setLimit(limit);
        mockQuery.setOffset(offset);

        tweetQueryService.setup((instance) => instance.findTweets(TypeMoq.It.is((query: FindTweetQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.getType() === mockQuery.getType();
            ret = ret && query.getIndex() === mockQuery.getIndex();
            ret = ret && query.isSet() === false;

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<TweetDTO>(200, mockTweets)));

        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit
            }
        };

        // Check with a standard call, no filter, pass
        let responseValue: string = "";
        await Request(opts).then((data: string) => {
            responseValue += data;
        });

        const actual: ResultList<Tweet> = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertTweet(actual.results[j], mockTweets[j]);
        }

        // let optsFilter = {
        //     method: "GET",
        //     uri: AbstractTestController.getBackend() + path,
        //     qs: {
        //         offset: offset,
        //         limit: limit,
        //         areas: ""
        //     }
        // };
        //
        //
        // tweetQueryService.setup((instance) => instance.findTrafficAccidents(TypeMoq.It.is((query: FindTrafficAccidentQuery) => {
        //     let ret = query.getLimit() === mockQuery.getLimit();
        //     ret = ret && query.getOffset() === mockQuery.getOffset();
        //     ret = ret && query.getType() === mockQuery.getType();
        //     ret = ret && query.getIndex() === mockQuery.getIndex();
        //     ret = ret && query.isSet() === true;
        //     ret = ret && query.getGeoFilter().getMustParams().length === 2;
        //     ret = ret && query.getGeoFilter().getMustParams()[0].getTopLeft().getLatitudeParams() === 44.0001;
        //     ret = ret && query.getGeoFilter().getMustParams()[0].getTopLeft().getLongitudeParams() === 3.01;
        //     ret = ret && query.getGeoFilter().getMustParams()[0].getBottomRight().getLatitudeParams() === 45.0001;
        //     ret = ret && query.getGeoFilter().getMustParams()[0].getBottomRight().getLongitudeParams() === 4.01;
        //     ret = ret && query.getGeoFilter().getMustParams()[1].getTopLeft().getLatitudeParams() === 4.0001;
        //     ret = ret && query.getGeoFilter().getMustParams()[1].getTopLeft().getLongitudeParams() === 1.01;
        //     ret = ret && query.getGeoFilter().getMustParams()[1].getBottomRight().getLatitudeParams() === 24.0001;
        //     ret = ret && query.getGeoFilter().getMustParams()[1].getBottomRight().getLongitudeParams() === 2.01;
        //     ret = ret && query.getGeoFilter().getShouldParams()[0].getTopLeft().getLatitudeParams() === 4.0101;
        //     ret = ret && query.getGeoFilter().getShouldParams()[0].getTopLeft().getLongitudeParams() === 5.01;
        //     ret = ret && query.getGeoFilter().getShouldParams()[0].getBottomRight().getLatitudeParams() === 2.0001;
        //     ret = ret && query.getGeoFilter().getShouldParams()[0].getBottomRight().getLongitudeParams() === 30.01;
        //
        //     ret = ret && query.getGeoFilter().getShouldParams().length === 1;
        //
        //     return ret;
        // }))).returns(() => Promise.resolve(new ResultList<CarAccidentDTO>(200, mockTweets)));
        //
        //
        // // Check with a standard call, no filter, pass
        // responseValue = "";
        // await Request(optsFilter).then((data: string) => {
        //     responseValue += data;
        // });
        //
        // actual = JSON.parse(responseValue);
        // Chai.assert.equal(actual.total, 200, "Expected same total");
        //
        // for (let j = 0; j < 10; j++) {
        //     this.assertTweet(actual.results[j], mockTweets[j]);
        // }
    }

    // @test
    // public async testFindTrafficError(): Promise<void> {
    //     const path: string = "/api/tweets";
    //     const offset: number = 0;
    //     const limit: number = 20;
    //
    //     // Check no offset
    //     let opts = {
    //         method: "GET",
    //         uri: AbstractTestController.getBackend() + path,
    //         qs: {
    //             offset: offset,
    //             limit: limit
    //         }
    //     };
    //     opts.qs.offset = null;
    //     let statusCode = HTTPStatusCodes.OK;
    //     await Request(opts).catch((error) => {
    //         statusCode = error.statusCode;
    //     });
    //
    //     Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    //
    //     // Check negative offset
    //     opts.qs.offset = -1;
    //     statusCode = HTTPStatusCodes.OK;
    //     await Request(opts).catch((error) => {
    //         statusCode = error.statusCode;
    //     });
    //
    //     Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    //
    //     // Check null limit
    //     opts.qs.offset = offset;
    //     opts.qs.limit = null;
    //     statusCode = HTTPStatusCodes.OK;
    //     await Request(opts).catch((error) => {
    //         statusCode = error.statusCode;
    //     });
    //
    //     Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    //
    //     // Check negative limit
    //     opts.qs.limit = -1;
    //     statusCode = HTTPStatusCodes.OK;
    //     await Request(opts).catch((error) => {
    //         statusCode = error.statusCode;
    //     });
    //
    //     Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    // }

    private assertTweet(actual: Tweet, expected: TweetDTO) {
        Chai.assert.equal(actual.id, expected.getId(), "Expected same identifier");
        Chai.assert.equal(actual.category, TweetCategory[expected.getCategory()], "Expected same category");
        Chai.assert.equal(actual.type, TweetType[expected.getType()], "Expected same type");
        Chai.assert.equal(actual.text, expected.getText(), "Expected same text");
        Chai.assert.equal(actual.pseudo, expected.getPseudo(), "Expected same pseud");
        for (let i = 0; i < expected.getMentions().length; i++) {
            Chai.assert.equal(actual.mentions[i], expected.getMentions()[i], "Expected same mentions");
        }
        for (let i = 0; i < expected.getKeywords().length; i++) {
            Chai.assert.equal(actual.keywords[i], expected.getKeywords()[i], "Expected same mentions");
        }
        for (let i = 0; i < expected.getHashtags().length; i++) {
            Chai.assert.equal(actual.hashtags[i], expected.getHashtags()[i], "Expected same mentions");
        }
        Chai.assert.equal(actual.feeling, expected.getFeeling(), "Expected same feeling");
        Chai.assert.equal(actual.createdAt, expected.getCreatedAt(), "Expected same createdAt");
    }

}
