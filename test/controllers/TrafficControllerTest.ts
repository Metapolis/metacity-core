import { AbstractTestController } from "./inversify/AbstractTestController";
import { suite, test } from "mocha-typescript";
import * as Request from "request-promise";
import * as Chai from "chai";
import ChaiHttp = require("chai-http");
import { TrafficQueryService } from "../../src/services/query/TrafficQueryService";
import { ContextApp } from "../ContextApp";
import { FindTrafficAccidentQuery } from "../../src/common/query/FindTrafficAccidentQuery";
import { AccidentSummary } from "../../src/controllers/rest/model/accident/AccidentSummary";
import { ResultList } from "../../src/common/ResultList";
import { CarAccidentDTO } from "../../src/services/query/dto/accident/CarAccidentDTO";
import { LocationDTO } from "../../src/services/query/dto/accident/LocationDTO";
import * as TypeMoq from "typemoq";
import * as HTTPStatusCodes from "http-status-codes";
import { GeoShape } from "../../src/common/GeoShape";
import { CollisionType } from "../../src/common/enum/accident/CollisionType";
import { Luminosity } from "../../src/common/enum/accident/Luminosity";
import { AtmosphericCondition } from "../../src/common/enum/accident/AtmosphericCondition";
import { ClimatologyDTO } from "../../src/services/query/dto/accident/ClimatologyDTO";
import { CollectivityDao } from "../../src/persistence/dao/CollectivityDao";
import { Collectivity } from "../../src/persistence/domain/Collectivity";
import { UserDao } from "../../src/persistence/dao/UserDao";
import { User } from "../../src/persistence/domain/User";
import { ActivityCircle } from "../../src/persistence/domain/ActivityCircle";
import { Role } from "../../src/common/enum/Role";

/**
 * All test for traffic controller
 */
@suite
class TrafficControllerTest extends AbstractTestController {

    /**
     * Test function find traffic accident
     */
    @test
    private async testFindAccidents(): Promise<void> {
        const path: string = "/api/traffics/accidents";
        const offset: number = 0;
        const limit: number = 20;
        const trafficQueryService: TypeMoq.IMock<TrafficQueryService> = (ContextApp.container.get("TrafficQueryServiceMock") as TypeMoq.IMock<TrafficQueryService>);
        const collectivityDaoMock: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const collectivityMock: Collectivity = new Collectivity();
        collectivityMock.setSecret("secret");

        const activityCircle: ActivityCircle = new ActivityCircle();

        const userMock: User = new User();
        (await userMock.getCircles()).push(activityCircle);

        activityCircle.setRoles([Role[Role.READ_ALL]]);

        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));

        const mockAccidents: CarAccidentDTO[] = [];
        for (let i = 0; i < 10; i++) {
            const mockAccident: CarAccidentDTO = new CarAccidentDTO();
            mockAccident.setId(i);
            mockAccident.setLocation(new LocationDTO());
            if (i % 2 === 0) {
                mockAccident.getLocation().setAddress("134 rue michel de la porterie 32000 San Francisco" + i);
            } else {
                mockAccident.getLocation().setAddress(undefined);
            }
            mockAccident.getLocation().setLongitude(Math.random() % 40);
            mockAccident.getLocation().setLatitude(Math.random() % 40);
            mockAccident.setCollisionType((i % Object.keys(CollisionType).length + 1) as CollisionType);

            mockAccident.setClimatology(new ClimatologyDTO());
            mockAccident.getClimatology().setAtmosphericCondition((i % Object.keys(AtmosphericCondition).length + 1) as AtmosphericCondition);
            mockAccident.getClimatology().setLuminosity((i % Object.keys(Luminosity).length + 1) as Luminosity);

            mockAccidents.push(mockAccident);
        }

        const mockQuery: FindTrafficAccidentQuery = new FindTrafficAccidentQuery();
        mockQuery.setLimit(limit);
        mockQuery.setOffset(offset);

        trafficQueryService.setup((instance) => instance.findTrafficAccidents(TypeMoq.It.is((query: FindTrafficAccidentQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.getType() === mockQuery.getType();
            ret = ret && query.getIndex() === mockQuery.getIndex();
            ret = ret && query.isSet() === false;

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<CarAccidentDTO>(200, mockAccidents)));

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

        let actual: ResultList<AccidentSummary> = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertAccidentSummary(actual.results[j], mockAccidents[j]);
        }

        let optsFilter = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit,
                areas: "[[44.0001|3.01]|[45.0001|4.01]],[[4.0001|1.01]|[24.0001|2.01]];[[4.0101|5.01]|[2.0001|30.01]]"
            },
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1iYXlvdSIsImlkIjoiMSIsInJvbGVzIjpbXSwiaWF0IjoxNTAxNTEzMjIwfQ.GnTWMzQYkyJImEybLUi7G-mGniqVwruAqA9ewXhgYQ8"
            }
        };

        trafficQueryService.setup((instance) => instance.findTrafficAccidents(TypeMoq.It.is((query: FindTrafficAccidentQuery) => {
            let ret = query.getLimit() === mockQuery.getLimit();
            ret = ret && query.getOffset() === mockQuery.getOffset();
            ret = ret && query.getType() === mockQuery.getType();
            ret = ret && query.getIndex() === mockQuery.getIndex();
            ret = ret && query.isSet() === true;
            ret = ret && query.getGeoFilter().getMustParams().length === 2;
            ret = ret && query.getGeoFilter().getMustParams()[0].getTopLeft().getLatitudeParams() === 44.0001;
            ret = ret && query.getGeoFilter().getMustParams()[0].getTopLeft().getLongitudeParams() === 3.01;
            ret = ret && query.getGeoFilter().getMustParams()[0].getBottomRight().getLatitudeParams() === 45.0001;
            ret = ret && query.getGeoFilter().getMustParams()[0].getBottomRight().getLongitudeParams() === 4.01;
            ret = ret && query.getGeoFilter().getMustParams()[1].getTopLeft().getLatitudeParams() === 4.0001;
            ret = ret && query.getGeoFilter().getMustParams()[1].getTopLeft().getLongitudeParams() === 1.01;
            ret = ret && query.getGeoFilter().getMustParams()[1].getBottomRight().getLatitudeParams() === 24.0001;
            ret = ret && query.getGeoFilter().getMustParams()[1].getBottomRight().getLongitudeParams() === 2.01;
            ret = ret && query.getGeoFilter().getShouldParams()[0].getTopLeft().getLatitudeParams() === 4.0101;
            ret = ret && query.getGeoFilter().getShouldParams()[0].getTopLeft().getLongitudeParams() === 5.01;
            ret = ret && query.getGeoFilter().getShouldParams()[0].getBottomRight().getLatitudeParams() === 2.0001;
            ret = ret && query.getGeoFilter().getShouldParams()[0].getBottomRight().getLongitudeParams() === 30.01;

            ret = ret && query.getGeoFilter().getShouldParams().length === 1;

            return ret;
        }))).returns(() => Promise.resolve(new ResultList<CarAccidentDTO>(200, mockAccidents)));


        // Check with a standard call, no filter, pass
        responseValue = "";
        await Request(optsFilter).then((data: string) => {
            responseValue += data;
        });

        actual = JSON.parse(responseValue);
        Chai.assert.equal(actual.total, 200, "Expected same total");

        for (let j = 0; j < 10; j++) {
            this.assertAccidentSummary(actual.results[j], mockAccidents[j]);
        }
    }

    @test
    public async testFindTrafficError(): Promise<void> {
        const path: string = "/api/traffics/accidents";
        const offset: number = 0;
        const limit: number = 20;

        // Check no authentication
        let opts = {
            method: "GET",
            uri: AbstractTestController.getBackend() + path,
            qs: {
                offset: offset,
                limit: limit
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
        const collectivityDaoMock: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);
        const userDao: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const collectivityMock: Collectivity = new Collectivity();
        collectivityMock.setSecret("secret");

        const activityCircle: ActivityCircle = new ActivityCircle();

        const userMock: User = new User();
        (await userMock.getCircles()).push(activityCircle);

        activityCircle.setRoles([Role[Role.READ_ALL]]);

        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));

        opts = {
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
        opts.qs.offset = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative offset
        // Have to be reset after crash
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));
        opts.qs.offset = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check null limit
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));
        opts.qs.offset = offset;
        opts.qs.limit = null;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");

        // Check negative limit
        userDao.setup((instance) => instance.findById(1)).returns(() => Promise.resolve(userMock));
        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));
        opts.qs.limit = -1;
        statusCode = HTTPStatusCodes.OK;
        await Request(opts).catch((error) => {
            statusCode = error.statusCode;
        });

        Chai.assert.equal(statusCode, HTTPStatusCodes.BAD_REQUEST, "Expect a 400");
    }

    /**
     * Check equality into actual and expected accident summary
     * @param actual
     * @param expected
     */
    private assertAccidentSummary(actual: AccidentSummary, expected: CarAccidentDTO) {
        Chai.assert.equal(actual.id, expected.getId(), "Expected same identifier");
        Chai.assert.isNotNull(actual.location, "Expected Location not null");
        Chai.assert.equal(actual.collisionType, CollisionType[expected.getCollisionType()], "Expected same collision type");
        if (expected.getLocation().getAddress() !== undefined) {
            Chai.assert.equal(actual.location.address, expected.getLocation().getAddress(), "Expected same address");
        } else {
            Chai.assert.isUndefined(actual.location.address, "Expected undefined");
        }
        Chai.assert.equal(actual.location.longitude, expected.getLocation().getLongitude(), "Expected same longitude");
        Chai.assert.equal(actual.location.latitude, expected.getLocation().getLatitude(), "Expected same latitude");

        Chai.assert.isNotNull(actual.climatology, "Expected climatology not null");
        Chai.assert.equal(actual.climatology.luminosity, Luminosity[expected.getClimatology().getLuminosity()], "Expected same climatology luminosity");
        Chai.assert.equal(actual.climatology.atmosphericCondition, AtmosphericCondition[expected.getClimatology().getLuminosity()], "Expected same climatology atmospheric condition");
    }

}
