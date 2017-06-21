import { UnsupportedOperationError } from "../error/UnsupportedOperationError";
import { TweetCategory } from "../enum/tweet/TweetCategory";

/**
 * Factory use to create tweet category
 */
export class TweetCategoryFactory {

    /**
     * Define binding with unofficial value
     *
     * @type {string}
     */
    private static unofficial: string = "UNOFFICIAL";

    /**
     * Define binding with official value
     *
     * @type {string}
     */
    private static official: string = "OFFICIAL";

    /**
     * Get GPSType from string value ("UNOFFICIAL", "OFFICIAL")
     *
     * @param value
     *
     * @return {TweetCategory}
     */
    public static getTweetCategory(value: string): TweetCategory {
        switch (value) {
            case TweetCategoryFactory.official:
                return TweetCategory.OFFICIAL;
            case TweetCategoryFactory.unofficial:
                return TweetCategory.UNOFFICIAL;
            default:
                throw new UnsupportedOperationError("'" + value + "' is not supported");
        }
    }
}
