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

import { TweetCategory } from "../../../../common/enum/tweet/TweetCategory";
import { TweetType } from "../../../../common/enum/tweet/TweetType";
import { TweetTypeFactory } from "../../../../common/factory/TweetTypeFactory";
import { TweetCategoryFactory } from "../../../../common/factory/TweetCategoryFactory";

/**
 * Data transfer object with all details about a tweet
 */
export class TweetDTO {

    /**
     * tweet's identifier
     */
    private id: number;

    /**
     * tweet's creation date (ISO8601)
     */
    private createdAt: string;

    /**
     * tweet's author pseudo
     */
    private pseudo: string;

    /**
     * tweet's content
     */
    private text: string;

    /**
     * tweet's category
     */
    private category: TweetCategory;

    /**
     * tweet's feeling (0-1)
     */
    private feeling: number;

    /**
     * tweet's type
     */
    private type: TweetType;

    /**
     * Twwet's hashtags
     */
    private hashtags: string[];

    /**
     * tweet's mentions
     */
    private mentions: string[];

    /**
     * tweet's keywords
     */
    private tags: string[];

    /**
     * Constructor from JSON
     *
     * @param json json used to construction
     */
    constructor(json?: { type: string, category: string }) {
        if (json !== undefined) {
            Object.assign(this, json);
            this.type = TweetTypeFactory.getTweetType(json.type);
            this.category = TweetCategoryFactory.getTweetCategory(json.category);
        }
    }

    /**
     * Getter identifier
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter createdAt
     *
     * @returns {string}
     */
    public getCreatedAt(): string {
        return this.createdAt;
    }

    /**
     * Setter createdAt
     *
     * @param createdAt new createdAtvalue
     */
    public setCreatedAt(createdAt: string): void {
        this.createdAt = createdAt;
    }

    /**
     * Getter pseudo
     *
     * @returns {string}
     */
    public getPseudo(): string {
        return this.pseudo;
    }

    /**
     * Setter pseudo
     *
     * @param pseudo new pseudo value
     */
    public setPseudo(pseudo: string): void {
        this.pseudo = pseudo;
    }

    /**
     * Getter text
     *
     * @returns {string}
     */
    public getText(): string {
        return this.text;
    }

    /**
     * Setter text
     *
     * @param text new text value
     */
    public setText(text: string): void {
        this.text = text;
    }

    /**
     * Getter category
     *
     * @returns {TweetCategory}
     */
    public getCategory(): TweetCategory {
        return this.category;
    }

    /**
     * Setter category
     *
     * @param category new category value
     */
    public setCategory(category: TweetCategory): void {
        this.category = category;
    }

    /**
     * Getter feeling
     *
     * @returns {number}
     */
    public getFeeling(): number {
        return this.feeling;
    }

    /**
     * Setter feeling
     *
     * @param feeling new feeling value
     */
    public setFeeling(feeling: number): void {
        this.feeling = feeling;
    }

    /**
     * Getter type
     *
     * @returns {TweetType}
     */
    public getType(): TweetType {
        return this.type;
    }

    /**
     * Setter type
     *
     * @param type new type value
     */
    public setType(type: TweetType): void {
        this.type = type;
    }

    /**
     * Getter hashtags
     *
     * @returns {string[]}
     */
    public getHashtags(): string[] {
        return this.hashtags;
    }

    /**
     * Setter hashtags
     *
     * @param hashtags new hashtags value
     */
    public setHashtags(hashtags: string[]): void {
        this.hashtags = hashtags;
    }

    /**
     * Getter mentions
     *
     * @returns {string[]}
     */
    public getMentions(): string[] {
        return this.mentions;
    }

    /**
     * Setter mentions
     *
     * @param mentions new mentions value
     */
    public setMentions(mentions: string[]): void {
        this.mentions = mentions;
    }

    /**
     * Getter tags
     *
     * @returns {string[]}
     */
    public getTags(): string[] {
        return this.tags;
    }

    /**
     * Setter tags
     *
     * @param tags new tags value
     */
    public setTags(tags: string[]): void {
        this.tags = tags;
    }
}
