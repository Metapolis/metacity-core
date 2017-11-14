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
 * Data transfer object with all details about a vote candidate
 */
export class CandidateDTO {

    /**
     * Candidate name
     */
    private name: string;

    /**
     * Candidate vote
     */
    private votes: number;

    /**
     * Candidate percentage
     */
    private percentage: number;

    /**
     * Constructor from json
     *
     * @param json json used to construction
     */
    constructor(json: {}) {
        Object.assign(this, json);
    }

    /**
     * Getter name
     *
     * @returns {Luminosity}
     */
    public getName(): string {
        return this.name;
    }

    /**
     * Setter name
     *
     * @param name new name value
     */
    public setName(name: string): void {
        this.name = name;
    }

    /**
     * Getter vote
     *
     * @returns {number}
     */
    public getVotes(): number {
        return this.votes;
    }

    /**
     * Setter vote
     *
     * @param votes new vote value
     */
    public setVotes(votes: number): void {
        this.votes = votes;
    }

    /**
     * Getter percentage
     *
     * @returns {number}
     */
    public getPercentage(): number {
        return this.percentage;
    }

    /**
     * Setter percentage
     *
     * @param percentage new percentage value
     */
    public setPercentage(percentage: number): void {
        this.percentage = percentage;
    }
}
