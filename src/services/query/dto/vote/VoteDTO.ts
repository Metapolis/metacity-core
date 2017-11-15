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

import { CandidateDTO } from "./CandidateDTO";
import { BureauDTO } from "./BureauDTO";

/**
 * Data transfer object with all details about a car accident
 */
export class VoteDTO {

    /**
     * Vote type
     */
    private type: string;

    /**
     * Vote sources
     */
    private sources: string[];

    /**
     * Vote date
     */
    private date: string;

    /**
     * Vote tour
     */
    private tour: number;

    /**
     * Vote canton
     */
    private canton: number;

    /**
     * Vote bureau
     */
    private bureau: BureauDTO;

    /**
     * Vote candidate
     */
    private candidate: CandidateDTO;

    /**
     * Constructor from JSON
     *
     * @param json json used to construction
     */
    constructor(json: {}) {
        Object.assign(this, json);
        this.candidate = new CandidateDTO(this.candidate);
        this.bureau = new BureauDTO(this.bureau);
    }

    /**
     * Getter type
     *
     * @returns {string}
     */
    public getType(): string {
        return this.type;
    }

    /**
     * Setter type
     *
     * @param type new type value
     */
    public setType(type: string): void {
        this.type = type;
    }

    /**
     * Getter sources
     *
     * @returns {string}
     */
    public getSources(): string[] {
        return this.sources;
    }

    /**
     * Setter sources
     *
     * @param sources new sources value
     */
    public setSources(sources: string[]): void {
        this.sources = sources;
    }

    /**
     * Getter date
     *
     * @returns {number}
     */
    public getDate(): string {
        return this.date;
    }

    /**
     * Setter date
     *
     * @param date new date value
     */
    public setDate(date: string): void {
        this.date = date;
    }

    /**
     * Getter tour
     *
     * @returns {number}
     */
    public getTour(): number {
        return this.tour;
    }

    /**
     * Setter tour
     *
     * @param tour new tour value
     */
    public setTour(tour: number): void {
        this.tour = tour;
    }

    /**
     * Getter canton
     *
     * @returns {number}
     */
    public getCanton(): number {
        return this.canton;
    }

    /**
     * Setter canton
     *
     * @param canton new canton value
     */
    public setCanton(canton: number): void {
        this.canton = canton;
    }

    /**
     * Getter bureau
     *
     * @returns {number}
     */
    public getBureau(): BureauDTO {
        return this.bureau;
    }

    /**
     * Setter bureau
     *
     * @param bureau new bureau value
     */
    public setBureau(bureau: BureauDTO): void {
        this.bureau = bureau;
    }

    /**
     * Getter candidate
     *
     * @returns {number}
     */
    public getCandidate(): CandidateDTO {
        return this.candidate;
    }

    /**
     * Setter candidate
     *
     * @param candidate new candidate value
     */
    public setCandidate(candidate: CandidateDTO): void {
        this.candidate = candidate;
    }

}
