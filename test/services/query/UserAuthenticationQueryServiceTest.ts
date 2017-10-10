import "reflect-metadata";
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { AbstractTestService } from "../inversify/AbstractTestService";
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import SearchResponse = Elasticsearch.SearchResponse;
import * as Chai from "chai";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { UserAuthenticationQueryService } from "../../../src/services/query/UserAuthenticationQueryService";
import { UserDao } from "../../../src/persistence/dao/UserDao";
import { UserAuthenticationTokenDTO } from "../../../src/services/query/dto/user/UserAuthenticationTokenDTO";
import { User } from "../../../src/persistence/domain/User";
import { Labeled } from "../../../src/common/Labeled";
import { AccessDeniedError } from "../../../src/common/error/AccessDeniedError";
import { UserTokenDTO } from "../../../src/services/query/dto/user/UserTokenDTO";
import { LocalAuthorityDao } from "../../../src/persistence/dao/LocalAuthorityDao";
import { LocalAuthority } from "../../../src/persistence/domain/LocalAuthority";
import { Credential } from "../../../src/persistence/domain/Credential";

/**
 * All test for user authentication query service
 */
@suite
class UserAuthenticationQueryServiceTest extends AbstractTestService {

    @test
    private async testAuthenticate(): Promise<void> {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);
        const userDaoMock: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);
        const localAuthorityDaoMock: TypeMoq.IMock<LocalAuthorityDao> = (ContextApp.container.get("LocalAuthorityDaoMock") as TypeMoq.IMock<LocalAuthorityDao>);

        const localAuthorityMock: LocalAuthority = new LocalAuthority();
        const credential: Credential = new Credential();
        credential.setSecret("danslavieparfoismaispasseulement");
        credential.setAccessKey("AccessKeyDesFamilles");
        localAuthorityMock.setCredential(Promise.resolve(credential));
        localAuthorityMock.setName("Domain");
        localAuthorityDaoMock.setup((instance) => instance.findByCredentialAccessKey("localhost")).returns(() => Promise.resolve(localAuthorityMock));

        const token: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        token.setPassword("password");
        token.setEmail("stark@tony.com");
        token.setDomain("localhost");

        const user: User = new User();
        user.setEmail("stark");
        user.setEmail("stark@tony.com");
        user.setId(1234);

        userDaoMock.setup((instance) => instance.findByEmail("stark")).returns(() => Promise.resolve(user));

        const userTokenDTO: UserTokenDTO = await userAuthenticationQueryService.authenticate(token);

        Chai.assert.equal(userTokenDTO.getId(), user.getId());
        Chai.assert.equal(userTokenDTO.getEmail(), user.getEmail());
    }

    @test
    private async testAuthenticateWithTokenNull() {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);

        await userAuthenticationQueryService.authenticate(null).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Token cannot be null or empty");
        });
    }

    @test
    private async testAuthenticateWithTokenUsernameNull() {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);

        await userAuthenticationQueryService.authenticate(new UserAuthenticationTokenDTO()).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Username cannot be null or empty");
        });
    }

    @test
    private async testAuthenticateWithTokenEmailEmpty() {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);

        const userAuthenticationTokenDTO: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        userAuthenticationTokenDTO.setEmail("");

        await userAuthenticationQueryService.authenticate(userAuthenticationTokenDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Email cannot be null or empty");
        });
    }

    @test
    private async testAuthenticateWithTokenUserNotFound() {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);

        const userAuthenticationTokenDTO: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        userAuthenticationTokenDTO.setEmail("toto");
        userAuthenticationTokenDTO.setDomain("localhost");


        await userAuthenticationQueryService.authenticate(userAuthenticationTokenDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, AccessDeniedError);
            Chai.assert.equal(err.message, "User not found");
        });
    }

    @test
    private async testAuthenticateWithTokenUserPasswordDifferent() {
        const userAuthenticationQueryService: UserAuthenticationQueryService = (ContextApp.container.get("UserAuthenticationQueryService") as UserAuthenticationQueryService);
        const userDaoMock: TypeMoq.IMock<UserDao> = (ContextApp.container.get("UserDaoMock") as TypeMoq.IMock<UserDao>);

        const user: User = new User();
        user.setEmail("stark@tony.com");
        user.setPassword("password");
        user.setId(1234);

        userDaoMock.setup((instance) => instance.findByEmail("toto")).returns(() => Promise.resolve(user));

        const userAuthenticationTokenDTO: UserAuthenticationTokenDTO = new UserAuthenticationTokenDTO();
        userAuthenticationTokenDTO.setEmail("toto");
        userAuthenticationTokenDTO.setDomain("localhost");

        await userAuthenticationQueryService.authenticate(userAuthenticationTokenDTO).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, AccessDeniedError);
            Chai.assert.equal(err.message, "Wrong password");
        });
    }
}

