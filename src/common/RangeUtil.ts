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

import { Utils } from "./Utils";
import { Range } from "./Range";
import * as Moment from "moment";

/**
 * Contain utils methods for range
 */
export class RangeUtil {

    /**
     * Date range limit member
     * @type {number}
     */
    private static DATE_RANGE_LIMIT_MEMBER: number = 2;

    /**
     * Create date range from a string "startDat|endDate" (ISO8601 format)
     * @param s
     * @returns {Range<number>}
     */
    public static createDateRange(s: string) {
        let range: string[] = [];
        range = range.concat(s.split("|"));
        Utils.checkArgument(range.length <= RangeUtil.DATE_RANGE_LIMIT_MEMBER, "Date range cannot have more than two params");

        if (range.length === 1) {
            const startDate: Moment.Moment = Moment(range[0], Moment.ISO_8601);
            Utils.checkArgument(startDate.isValid(), "Start date is not valid");
            return new Range<number>(Number(startDate.format("x")), Number.MAX_VALUE);
        } else {
            let start: number;
            if (Utils.isNullOrEmpty(range[0])) {
                start = Number.MIN_VALUE;
            } else {
                const startDate: Moment.Moment = Moment(range[0], Moment.ISO_8601);
                Utils.checkArgument(startDate.isValid(), "Start date is not valid");
                start = Number(startDate.format("x"));
            }
            const endDate: Moment.Moment = Moment(range[1], Moment.ISO_8601);
            Utils.checkArgument(endDate.isValid(), "Start date is not valid");

            return new Range<number>(start, Number(endDate.format("x")));
        }
    }
}
