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
import { ClientControlManager } from "../../../src/common/security/ClientControlManager";

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
}
