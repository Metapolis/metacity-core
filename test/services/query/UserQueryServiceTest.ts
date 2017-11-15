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

import { AbstractTestService } from "../inversify/AbstractTestService";
import { suite, test } from "mocha-typescript";
import { UserQueryService } from "../../../src/services/query/UserQueryService";
import { ContextApp } from "../../ContextApp";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import * as TypeMoq from "typemoq";
import { User } from "../../../src/persistence/domain/User";
import { FindUserQuery } from "../../../src/common/query/FindUserQuery";
import { UserDTO } from "../../../src/services/query/dto/user/UserDTO";
import * as Chai from "chai";
import { ResultList } from "../../../src/common/ResultList";
import { LogicalQueryCriteria } from "../../../src/common/query/LogicalQueryCriteria";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";

/**
 * All test for user authentication query service
 */
@suite
class UserQueryServiceTest extends AbstractTestService {

    @test
    public async testFindUsers(): Promise<void> {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);
        const userDaoMock: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const users: User[] = [];
        // Create user 1
        const user1: User = new User();
        user1.setId(1);
        user1.setFirstName("John");
        user1.setLastName("Cena");
        user1.setPassword("password2");
        user1.setEmail("john@cena");

        // Create user 2
        const user2: User = new User();
        user2.setId(2);
        user2.setFirstName("John-Snowden");
        user2.setLastName("Kebab");
        user2.setPassword("password2");
        user2.setEmail("snow@la.com");

        // Create user 3
        const user3: User = new User();
        user3.setId(3);
        user3.setFirstName("Tony");
        user3.setLastName("Stark");
        user3.setPassword("password2");
        user3.setEmail("tony@stark.com");

        users.push(user1);
        users.push(user2);
        users.push(user3);

        userDaoMock.setup((instance) => instance.findBy(TypeMoq.It.isAnyObject(FindUserQuery))).returns(() => Promise.resolve(users));
        userDaoMock.setup((instance) => instance.countBy(TypeMoq.It.isAnyObject(FindUserQuery))).returns(() => Promise.resolve(15));

        const queryMock: FindUserQuery = new FindUserQuery();
        let find: ResultList<UserDTO> = await userQueryService.findUsers(queryMock);

        Chai.assert.equal(find.total, 15);
        for (let i = 0; i < find.results.length; i++) {
            this.assertUser(find.results[i], users[i]);
        }

        userDaoMock.verify((instance) => instance.findBy(TypeMoq.It.is((query: FindUserQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === queryMock.isSet();
            if (query.isSet()) {
                ret = ret && query.getQFilter().getMustParams().length === queryMock.getQFilter().getMustParams().length;
                for (let i = 0; i < query.getQFilter().getMustParams().length; i++) {
                    ret = ret && query.getQFilter().getMustParams()[i] === queryMock.getQFilter().getMustParams()[i];
                }
                ret = ret && query.getQFilter().getShouldParams().length === queryMock.getQFilter().getShouldParams().length;
                for (let i = 0; i < query.getQFilter().getShouldParams().length; i++) {
                    ret = ret && query.getQFilter().getShouldParams()[i] === queryMock.getQFilter().getShouldParams()[i];
                }
            }

            return ret;
        })), TypeMoq.Times.exactly(1));

        userDaoMock.verify((instance) => instance.countBy(TypeMoq.It.is((query: FindUserQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === queryMock.isSet();
            if (query.isSet()) {
                ret = ret && query.getQFilter().getMustParams().length === queryMock.getQFilter().getMustParams().length;
                for (let i = 0; i < query.getQFilter().getMustParams().length; i++) {
                    ret = ret && query.getQFilter().getMustParams()[i] === queryMock.getQFilter().getMustParams()[i];
                }
                ret = ret && query.getQFilter().getShouldParams().length === queryMock.getQFilter().getShouldParams().length;
                for (let i = 0; i < query.getQFilter().getShouldParams().length; i++) {
                    ret = ret && query.getQFilter().getShouldParams()[i] === queryMock.getQFilter().getShouldParams()[i];
                }
            }

            return ret;
        })), TypeMoq.Times.exactly(1));

        userDaoMock.reset();

        userDaoMock.setup((instance) => instance.findBy(TypeMoq.It.isAnyObject(FindUserQuery))).returns(() => Promise.resolve(users));
        userDaoMock.setup((instance) => instance.countBy(TypeMoq.It.isAnyObject(FindUserQuery))).returns(() => Promise.resolve(15));

        queryMock.setQFilter(new LogicalQueryCriteria<string>(["toto", "1"], ["ici", "Kebab"]));
        find = await userQueryService.findUsers(queryMock);
        Chai.assert.equal(find.total, 15);
        for (let i = 0; i < find.results.length; i++) {
            this.assertUser(find.results[i], users[i]);
        }

        userDaoMock.verify((instance) => instance.findBy(TypeMoq.It.is((query: FindUserQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === queryMock.isSet();
            if (query.isSet()) {
                ret = ret && query.getQFilter().getMustParams().length === queryMock.getQFilter().getMustParams().length;
                for (let i = 0; i < query.getQFilter().getMustParams().length; i++) {
                    ret = ret && query.getQFilter().getMustParams()[i] === queryMock.getQFilter().getMustParams()[i];
                }
                ret = ret && query.getQFilter().getShouldParams().length === queryMock.getQFilter().getShouldParams().length;
                for (let i = 0; i < query.getQFilter().getShouldParams().length; i++) {
                    ret = ret && query.getQFilter().getShouldParams()[i] === queryMock.getQFilter().getShouldParams()[i];
                }
            }

            return ret;
        })), TypeMoq.Times.exactly(1));

        userDaoMock.verify((instance) => instance.countBy(TypeMoq.It.is((query: FindUserQuery) => {
            let ret: boolean = query.getLimit() === queryMock.getLimit();
            ret = ret && query.getOffset() === queryMock.getOffset();
            ret = ret && query.isSet() === queryMock.isSet();
            if (query.isSet()) {
                ret = ret && query.getQFilter().getMustParams().length === queryMock.getQFilter().getMustParams().length;
                for (let i = 0; i < query.getQFilter().getMustParams().length; i++) {
                    ret = ret && query.getQFilter().getMustParams()[i] === queryMock.getQFilter().getMustParams()[i];
                }
                ret = ret && query.getQFilter().getShouldParams().length === queryMock.getQFilter().getShouldParams().length;
                for (let i = 0; i < query.getQFilter().getShouldParams().length; i++) {
                    ret = ret && query.getQFilter().getShouldParams()[i] === queryMock.getQFilter().getShouldParams()[i];
                }
            }

            return ret;
        })), TypeMoq.Times.exactly(1));

    }

    @test
    private async testFindUsersQueryNull() {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);

        await userQueryService.findUsers(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Query cannot be null");
        });
    }

    @test
    private async testFindUsersQueryOffsetNull() {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);

        const findUsersQuery: FindUserQuery = new FindUserQuery();
        findUsersQuery.setOffset(null);

        await userQueryService.findUsers(findUsersQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset must be set");
        });
    }

    @test
    private async testFindUsersQueryOffsetNegative() {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);

        const findUsersQuery: FindUserQuery = new FindUserQuery();
        findUsersQuery.setOffset(-1);

        await userQueryService.findUsers(findUsersQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Offset cannot be negative");
        });
    }

    @test
    private async testFindUsersQueryLimitNull() {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);

        const findUsersQuery: FindUserQuery = new FindUserQuery();
        findUsersQuery.setLimit(null);

        await userQueryService.findUsers(findUsersQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be set");
        });
    }

    @test
    private async testFindUsersQueryLimitZero() {
        const userQueryService: UserQueryService = (ContextApp.container.get("UserQueryService") as UserQueryService);

        const findUsersQuery: FindUserQuery = new FindUserQuery();
        findUsersQuery.setLimit(0);

        await userQueryService.findUsers(findUsersQuery).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Limit must be superior to zero");
        });
    }

    private assertUser(actual: UserDTO, expected: User) {
        Chai.assert.equal(actual.getId(), expected.getId());
        Chai.assert.equal(actual.getEmail(), expected.getEmail());
        Chai.assert.equal(actual.getFirstName(), expected.getFirstName());
        Chai.assert.equal(actual.getLastName(), expected.getLastName());
    }
}
