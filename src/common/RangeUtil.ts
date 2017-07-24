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
