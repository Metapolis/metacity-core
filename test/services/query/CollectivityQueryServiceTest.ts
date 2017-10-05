import { AbstractTestService } from "../inversify/AbstractTestService";
import { CollectivityQueryService } from "../../../src/services/query/CollectivityQueryService";
import { ContextApp } from "../../ContextApp";
import { CollectivityDao } from "../../../src/persistence/dao/CollectivityDao";
import { Collectivity } from "../../../src/persistence/domain/Collectivity";
import { CollectivityDTO } from "../../../src/services/query/dto/collectivity/CollectivityDTO";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";

/**
 * All test for user collectivity query service
 */
@suite
class CollectivityQueryServiceTest extends AbstractTestService {

    @test
    private async testGetCollectivity(): Promise<void> {
        const collectivityQueryService: CollectivityQueryService = (ContextApp.container.get("CollectivityQueryService") as CollectivityQueryService);
        const collectivityDaoMock: TypeMoq.IMock<CollectivityDao> = (ContextApp.container.get("CollectivityDaoMock") as TypeMoq.IMock<CollectivityDao>);

        const collectivityMock: Collectivity = new Collectivity();
        collectivityMock.setSecret("secret");
        collectivityMock.setName("Domain");
        collectivityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(collectivityMock));

        let collectivityDTO: CollectivityDTO = await collectivityQueryService.getCollectivity("localhost");

        Chai.assert.equal(collectivityDTO.getId(), collectivityMock.getId());
        Chai.assert.equal(collectivityDTO.getSecret(), collectivityMock.getSecret());
        Chai.assert.equal(collectivityDTO.getName(), collectivityMock.getName());

        collectivityDTO = await collectivityQueryService.getCollectivity("localhost2");

        Chai.assert.isNull(collectivityDTO);
    }

    @test
    private async testFindCollectivityWithNullDomain() {
        const collectivityQueryService: CollectivityQueryService = (ContextApp.container.get("CollectivityQueryService") as CollectivityQueryService);

        await collectivityQueryService.getCollectivity(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }

    @test
    private async testFindCollectivityWithEmptyDomain() {
        const collectivityQueryService: CollectivityQueryService = (ContextApp.container.get("CollectivityQueryService") as CollectivityQueryService);

        await collectivityQueryService.getCollectivity("").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }
}
