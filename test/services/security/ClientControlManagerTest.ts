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

import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import * as Chai from "chai";
import { AbstractTestService } from "../inversify/AbstractTestService";
import CryptoJS = require("crypto-js");
import * as TypeMoq from "typemoq";
import { ContextApp } from "../../ContextApp";
import { CredentialDao } from "../../../src/persistence/dao/CredentialDao";
import { Credential } from "../../../src/persistence/domain/Credential";
import { Role } from "../../../src/common/enum/Role";
import { ClientControlManager } from "../../../src/security/ClientControlManager";
import { IllegalArgumentError } from "../../../src/common/error/IllegalArgumentError";
import { AccessDeniedError } from "../../../src/common/error/AccessDeniedError";

/**
 * All test for traffic query service
 */
@suite
class TrafficQueryServiceTest extends AbstractTestService {

    @test
    public async testAuthenticateClient() {
        const credentialDaoMock: TypeMoq.IMock<CredentialDao> = ContextApp.container.get("CredentialDaoMock") as TypeMoq.IMock<CredentialDao>;
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        const credentialMock: Credential = new Credential();
        credentialMock.setRoles([Role.ACCESS_ACCIDENT, Role.MANAGE_CIRCLE]);
        credentialMock.setAccessKey("tonycorp");
        credentialMock.setSecret("secret");

        const path: string = "/test/2/toto";
        const accessKey: string = "tonycorp";
        const secret: string = "secret";
        const hash = CryptoJS.SHA512(path.concat(":").concat(accessKey).concat(":").concat(secret)).toString();

        const params = new Map();
        params.set("accesskey", accessKey);
        params.set("key1", "1toto");
        params.set("key2", "2toto");
        params.set("key3", ["3toto", "4toto"]);

        const paramsString = "accesskey:tonycorp:key1:1toto:key2:2toto:key3:3toto/4toto";
        const method = "GET";
        const timestamp = Date.now();

        const signature = CryptoJS.SHA512(method.concat(":").concat(String(Date.now())).concat(":").concat(hash).concat(":").concat(paramsString)).toString();
        credentialDaoMock.setup((instance) => instance.findByAccessKey(accessKey)).returns(() => Promise.resolve(credentialMock));

        const roles: string[] = await clientControlManager.authenticateClient(path, signature, params, timestamp, method);

        Chai.assert.equal(roles.length, credentialMock.getRoles().length);
        for (let i = 0; i < roles.length; i++) {
            Chai.assert.equal(roles[i], credentialMock.getRoles()[i]);
        }
    }

    @test
    private async testAuthenticateClientPathUndefined() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient(undefined, undefined, undefined, undefined, undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientPathEmpty() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("", undefined, undefined, undefined, undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientMethodUndefined() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", undefined, undefined, undefined, undefined).then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientMethodEmpty() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", undefined, undefined, undefined, "").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientTimestampUndefined() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", undefined, undefined, undefined, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientParamsUndefined() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", undefined, undefined, 123, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientSignatureUndefined() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", undefined, new Map(), 123, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientSignatureEmpty() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", "", new Map(), 123, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "");
        });
    }

    @test
    private async testAuthenticateClientNoAccessKey() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", "signature", new Map(), 123, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, IllegalArgumentError);
            Chai.assert.equal(err.message, "Access key param not found");
        });
    }

    @test
    private async testAuthenticateClientCallExpired() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", "signature", new Map([["accesskey", "tonycorp"]]), 123, "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, AccessDeniedError);
            Chai.assert.equal(err.message, "Call expired for this time '123'");
        });
    }

    @test
    private async testAuthenticateClientCredentialDoesNotExist() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;

        await clientControlManager.authenticateClient("/toto", "signature", new Map([["accesskey", "tonycorp"]]), Date.now(), "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, AccessDeniedError);
            Chai.assert.equal(err.message, "No credential found for accessKey 'tonycorp'");
        });
    }

    @test
    private async testAuthenticateClientSignatureCheckFailed() {
        const clientControlManager: ClientControlManager = ContextApp.container.get("ClientControlManager") as ClientControlManager;
        const credentialDaoMock: TypeMoq.IMock<CredentialDao> = ContextApp.container.get("CredentialDaoMock") as TypeMoq.IMock<CredentialDao>;
        const checkRegExp = new RegExp(/Invalid signature. Found .*/);
        const credentialMock: Credential = new Credential();
        credentialMock.setRoles([Role.ACCESS_ACCIDENT, Role.MANAGE_CIRCLE]);
        credentialMock.setAccessKey("tonycorp");
        credentialMock.setSecret("secret");

        credentialDaoMock.setup((instance) => instance.findByAccessKey("tonycorp")).returns(() => Promise.resolve(credentialMock));

        await clientControlManager.authenticateClient("/toto", "signature", new Map([["accesskey", "tonycorp"]]), Date.now(), "GET").then((result) => {
            throw Error("Illegal argument error expected");
        }, (err) => {
            Chai.assert.instanceOf(err, AccessDeniedError);
            Chai.assert.isTrue(checkRegExp.test(err.message));
        });
    }
}
