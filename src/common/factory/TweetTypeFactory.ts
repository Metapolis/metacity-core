import { GPSType } from "../enum/accident/GPSType";
import { UnsupportedOperationError } from "../error/UnsupportedOperationError";
import { TweetType } from "../enum/tweet/TweetType";

/**
 * Factory use to create TweetType
 */
export class TweetTypeFactory {

    /**
     * Define binding with tweet value
     *
     * @type {string}
     */
    private static tweet: string = "T";

    /**
     * Define binding with retweet value
     *
     * @type {string}
     */
    private static retweet: string = "RT";

    /**
     * Define binding with replies value
     *
     * @type {string}
     */
    private static replies: string = "RE";

    /**
     * Get TweetType from string value ("T", "RT", "RE")
     *
     * @param value
     *
     * @return {GPSType}
     */
    public static getTweetType(value: string): TweetType {
        switch (value) {
            case TweetTypeFactory.tweet:
                return TweetType.T;
            case TweetTypeFactory.retweet:
                return TweetType.RT;
            case TweetTypeFactory.replies:
                return TweetType.RE;
            default:
                throw new UnsupportedOperationError("'" + value + "' is not supported");
        }
    }
}
