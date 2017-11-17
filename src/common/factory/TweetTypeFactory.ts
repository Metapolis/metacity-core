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
