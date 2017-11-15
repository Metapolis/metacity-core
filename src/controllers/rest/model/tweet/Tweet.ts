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
 * Data transfer object with all details about a tweet
 */
export class Tweet {

    /**
     * tweet's identifier
     */
    public id: number;

    /**
     * tweet's creation date
     */
    public createdAt: string;

    /**
     * tweet's author pseudo
     */
    public pseudo: string;

    /**
     * tweet's content
     */
    public text: string;

    /**
     * tweet's category
     */
    public category: string;

    /**
     * tweet's feeling (0-1)
     */
    public feeling: number;

    /**
     * tweet's type
     */
    public type: string;

    /**
     * Twwet's hashtags
     */
    public hashtags: string[];

    /**
     * tweet's mentions
     */
    public mentions: string[];

    /**
     * tweet's tags
     */
    public tags: string[];
}
