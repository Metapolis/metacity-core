import { AbstractTestService } from "../inversify/AbstractTestService";
import { LocalAuthorityQueryService } from "../../../src/services/query/LocalAuthorityQueryService";
import { ContextApp } from "../../ContextApp";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../src/persistence/domain/LocalAuthority";
import { LocalAuthorityDTO } from "../../../src/services/query/dto/localAuthority/LocalAuthorityDTO";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as Chai from "chai";
import * as TypeMoq from "typemoq";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";

/**
 * All test for user localAuthority query service
 */
@suite
class LocalAuthorityQueryServiceTest extends AbstractTestService {

    @test
    private async testGetLocalAuthority(): Promise<void> {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);

        const localAuthorityMock: LocalAuthority = new LocalAuthority();
        localAuthorityMock.setSecret("secret");
        localAuthorityMock.setName("Domain");
        localAuthorityDaoMock.setup((instance) => instance.findById("localhost")).returns(() => Promise.resolve(localAuthorityMock));

        let localAuthorityDTO: LocalAuthorityDTO = await localAuthorityQueryService.getLocalAuthority("localhost");

        Chai.assert.equal(localAuthorityDTO.getId(), localAuthorityMock.getId());
        Chai.assert.equal(localAuthorityDTO.getSecret(), localAuthorityMock.getSecret());
        Chai.assert.equal(localAuthorityDTO.getName(), localAuthorityMock.getName());

        localAuthorityDTO = await localAuthorityQueryService.getLocalAuthority("localhost2");

        Chai.assert.isNull(localAuthorityDTO);
    }

    @test
    private async testFindLocalAuthorityWithNullDomain() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthority(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }

    @test
    private async testFindLocalAuthorityWithEmptyDomain() {
        const localAuthorityQueryService: LocalAuthorityQueryService = (ContextApp.container.get("LocalAuthorityQueryService") as LocalAuthorityQueryService);

        await localAuthorityQueryService.getLocalAuthority("").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Domain cannot be null or empty");
        });
    }
}
