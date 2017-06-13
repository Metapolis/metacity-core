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
            return new Range<number>(Moment(range[0]).millisecond(), Number.MAX_VALUE);
        } else {
            const start = Utils.isNullOrEmpty(range[0]) ? Number.MIN_VALUE : Moment(range[0]).millisecond();
            return new Range<number>(start, Moment(range[1]).millisecond());
        }
    }
}
