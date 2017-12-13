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

import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { ContextApp } from "../ContextApp";
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
import { Circle } from "../../src/persistence/domain/Circle";
import { LocalAuthority } from "../../src/persistence/domain/LocalAuthority";
import { LocalAuthorityDao } from "../../src/persistence/dao/LocalAuthorityDao";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { User } from "../../src/persistence/domain/User";
import { Role } from "../../src/common/enum/Role";
import { Credential } from "../../src/persistence/domain/Credential";
import { ClientControlManager } from "../../src/security/ClientControlManager";

/**
 * All test for tweet controller
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
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        const localAuthorityMock: LocalAuthority = new LocalAuthority();
        const credential: Credential = new Credential();
        credential.setSecret("secret");
        localAuthorityMock.setCredential(Promise.resolve(credential));

        const circle: Circle = new Circle();

        const userMock: User = new User();
        (await userMock.getCircles()).push(circle);

        circle.setRoles([Role.ACCESS_TWEET]);

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));

        const mockTweets: TweetDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockTweet: TweetDTO = new TweetDTO();
            mockTweet.setId(i);
            mockTweet.setCategory((i % Object.keys(TweetCategory).length + 1) as TweetCategory);
            mockTweet.setType((i % Object.keys(TweetType).length + 1) as TweetType);
            mockTweet.setId(i);
            mockTweet.setCreatedAt(String(i));
            mockTweet.setFeeling(Math.random());
            mockTweet.setHashtags([TestUtils.randomString(i), TestUtils.randomString(i), TestUtils.randomString(i), TestUtils.randomString(i)]);
            mockTweet.setTags([TestUtils.randomString(i + 12), TestUtils.randomString(i + 12), TestUtils.randomString(i + 12), TestUtils.randomString(i + 12)]);
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
            },
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1iYXlvdSIsImlkIjoiMSIsInJvbGVzIjpbXSwiaWF0IjoxNTAxNTEzMjIwfQ.GnTWMzQYkyJImEybLUi7G-mGniqVwruAqA9ewXhgYQ8"
            }
        };

        // Check with a standard call, no filter, pass
        let responseValue: string = "";
        await Request(opts).then((data: string) => {
            responseValue += data;
        });

        let actual: ResultList<Tweet> = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertTweet(actual.results[j], mockTweets[j]);
        }

        let optsFilter = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit,
                dates: "1977-04-22T06:00:00Z|1979-04-22T06:00:00Z",
                mentions: "",
                hashtags: ""
            },
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1iYXlvdSIsImlkIjoiMSIsInJvbGVzIjpbXSwiaWF0IjoxNTAxNTEzMjIwfQ.GnTWMzQYkyJImEybLUi7G-mGniqVwruAqA9ewXhgYQ8"
            }
        };

        tweetQueryService.setup((instance) => instance.findTweets(TypeMoq.It.is((query: FindTweetQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.getType() === mockQuery.getType();
            ret = ret && query.getIndex() === mockQuery.getIndex();
            ret = ret && query.isSet() === true;
            ret = ret && query.getDateFilter().getMustParams().length === 1;
            ret = ret && query.getDateFilter().getMustParams()[0].getStart() === 230536800000;
            ret = ret && query.getDateFilter().getMustParams()[0].getEnd() === 293608800000;

            ret = ret && query.getDateFilter().getShouldParams().length === 0;

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<TweetDTO>(200, mockTweets)));


        // Check with a standard call, no filter, pass
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        responseValue = "";
        await Request(optsFilter).then((data: string) => {
            responseValue += data;
        });

        actual = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertTweet(actual.results[j], mockTweets[j]);
        }

        optsFilter.qs.dates = "1977-04-22T06:00:00Z;|1979-04-22T10:00:00Z";
        optsFilter.qs.mentions = "toto;tbm,titi";
        optsFilter.qs.hashtags = "beer;eratum,stark";

        tweetQueryService.setup((instance) => instance.findTweets(TypeMoq.It.is((query: FindTweetQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.getType() === mockQuery.getType();
            ret = ret && query.getIndex() === mockQuery.getIndex();
            ret = ret && query.isSet() === true;
            ret = ret && query.getDateFilter().getMustParams().length === 1;
            ret = ret && query.getDateFilter().getMustParams()[0].getStart() === 230536800000;
            ret = ret && query.getDateFilter().getMustParams()[0].getEnd() === Number.MAX_VALUE;
            ret = ret && query.getDateFilter().getShouldParams().length === 1;
            ret = ret && query.getDateFilter().getShouldParams()[0].getStart() === Number.MIN_VALUE;
            ret = ret && query.getDateFilter().getShouldParams()[0].getEnd() === 293623200000;

            ret = ret && query.getMentionFilter().getMustParams().length === 1;
            ret = ret && query.getMentionFilter().getMustParams()[0] === "toto";
            ret = ret && query.getMentionFilter().getShouldParams().length === 2;
            ret = ret && query.getMentionFilter().getShouldParams()[0] === "tbm";
            ret = ret && query.getMentionFilter().getShouldParams()[1] === "titi";

            ret = ret && query.getHashtagFilter().getMustParams().length === 1;
            ret = ret && query.getHashtagFilter().getMustParams()[0] === "beer";
            ret = ret && query.getHashtagFilter().getShouldParams().length === 2;
            ret = ret && query.getHashtagFilter().getShouldParams()[0] === "eratum";
            ret = ret && query.getHashtagFilter().getShouldParams()[1] === "stark";

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<TweetDTO>(200, mockTweets)));

        // Check with a standard call, no filter, pass
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        responseValue = "";
        await Request(optsFilter).then((data: string) => {
            responseValue += data;
        });

        actual = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertTweet(actual.results[j], mockTweets[j]);
        }
    }

    @test
    public async testFindTrafficError(): Promise<void> {
        const path: string = "/api/tweets";
        const offset: number = 0;
        const limit: number = 20;
        (ContextApp.container.get("ClientControlManagerMock") as TypeMoq.IMock<ClientControlManager>).setup(
            (instance) => instance.authenticateClient(
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny(),
                TypeMoq.It.isAny())).returns(() => Promise.resolve([Role.ACCESS_TWEET, Role.MANAGE_USER, Role.MANAGE_CIRCLE]));

        // Check no authentication
        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit,
                dates: "",
                mentions: "",
                hashtags: ""
            },
            headers: {
                Authorization: ""
            }
        };
        opts.headers.Authorization = undefined;
        opts.qs.offset = null;
        let statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check no offset
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const localAuthorityMock: LocalAuthority = new LocalAuthority();
        const credential: Credential = new Credential();
        credential.setSecret("secret");
        localAuthorityMock.setCredential(Promise.resolve(credential));

        const circle: Circle = new Circle();

        const userMock: User = new User();
        (await userMock.getCircles()).push(circle);

        circle.setRoles([Role.ACCESS_TWEET]);

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));

        opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit,
                dates: "",
                mentions: "",
                hashtags: ""
            },
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1iYXlvdSIsImlkIjoiMSIsInJvbGVzIjpbXSwiaWF0IjoxNTAxNTEzMjIwfQ.GnTWMzQYkyJImEybLUi7G-mGniqVwruAqA9ewXhgYQ8"
            }
        };
        opts.qs.offset = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative offset
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.offset = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check null limit
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.offset = offset;
        opts.qs.limit = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative limit
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.limit = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check invalid format date
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.limit = 1;
        opts.qs.dates = "TOTO";
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.dates = "TOTO";
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.dates = "1977-04-22T06:00:00Z|1977-04-22T06:00:00Z|1977-04-22T06:00:00Z";
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        opts.qs.dates = "1977-04-22T06:00:00Z|1977-04-22T06:00:00Z;|1977-04-22T06:00:00Z;|1977-04-22T06:00:00Z";
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    private assertTweet(actual: Tweet, expected: TweetDTO) {
        Chai.assert.equal(actual.id, expected.getId(), "Expected same identifier");
        Chai.assert.equal(actual.category, TweetCategory[expected.getCategory()], "Expected same category");
        Chai.assert.equal(actual.type, TweetType[expected.getType()], "Expected same type");
        Chai.assert.equal(actual.text, expected.getText(), "Expected same text");
        Chai.assert.equal(actual.pseudo, expected.getPseudo(), "Expected same pseud");
        for (let i = 0; i < expected.getMentions().length; i++) {
            Chai.assert.equal(actual.mentions[i], expected.getMentions()[i], "Expected same mentions");
        }
        for (let i = 0; i < expected.getTags().length; i++) {
            Chai.assert.equal(actual.tags[i], expected.getTags()[i], "Expected same mentions");
        }
        for (let i = 0; i < expected.getHashtags().length; i++) {
            Chai.assert.equal(actual.hashtags[i], expected.getHashtags()[i], "Expected same mentions");
        }
        Chai.assert.equal(actual.feeling, expected.getFeeling(), "Expected same feeling");
        Chai.assert.equal(actual.createdAt, expected.getCreatedAt(), "Expected same createdAt");
    }

}
