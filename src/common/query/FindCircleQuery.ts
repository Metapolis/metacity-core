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

/**
 * Contains circle search query
 */
export class FindCircleQuery {

    /**
     * Query limit (default 100)
     *
     * @type {number}
     */
    private limit: number = 100;

    /**
     * Query offset (default 0)
     * @type {number}
     */
    private offset: number = 0;

    /**
     * localAuthority owner
     * @type {number}
     */
    private localAuthorityId: number;

    /**
     * True means parameters are set
     *
     * @returns {boolean} True if all parameters are set
     */
    public isSet(): boolean {
        return this.localAuthorityId !== undefined;
    }

    /**
     * circle's limit getter
     */
    public getLimit(): number {
        return this.limit;
    }

    /**
     * circle's limit setter
     */
    public setLimit(limit: number) {
        this.limit = limit;
    }

    /**
     * circle's offset getter
     */
    public getOffset(): number {
        return this.offset;
    }

    /**
     * circle's offset setter
     */
    public setOffset(offset: number) {
        this.offset = offset;
    }

    /**
     * circle's localAuthorityId getter
     */
    public getLocalAuthorityId(): number {
        return this.localAuthorityId;
    }

    /**
     * circle's localAuthorityId setter
     */
    public setLocalAuthorityId(localAuthorityId: number) {
        this.localAuthorityId = localAuthorityId;
    }
}
