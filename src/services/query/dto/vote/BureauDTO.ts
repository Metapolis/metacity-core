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
 * Data transfer object with all details about a "bureau de vote"
 */
export class BureauDTO {

    /**
     * Bureau id
     */
    private id: number;

    /**
     * Bureau name
     */
    private name: string;

    /**
     * Registrations number
     */
    private registrations: number;

    /**
     * Number on voters
     */
    private voters: number;

    /**
     * Number of vote null
     */
    private votesNull: number;

    /**
     * Number of vote cast
     */
    private votesCast: number;

    /**
     * Participation Rate
     */
    private participation: number;

    /**
     * Constructor from json
     *
     * @param json json used to construction
     */
    constructor(json: {}) {
        Object.assign(this, json);
    }

    /**
     * Getter id
     *
     * @returns {number}
     */
    public getId(): number {
        return this.id;
    }

    /**
     * Setter id
     *
     * @param id new id value
     */
    public setId(id: number): void {
        this.id = id;
    }

    /**
     * Getter name
     *
     * @returns {string}
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
     * Getter registration number
     *
     * @returns {number}
     */
    public getRegistrations(): number {
        return this.registrations;
    }

    /**
     * Setter registrations
     *
     * @param registrations new registrations value
     */
    public setRegistrations(registrations: number): void {
        this.registrations = registrations;
    }

    /**
     * Getter voters
     *
     * @returns {number}
     */
    public getVoters(): number {
        return this.voters;
    }

    /**
     * Setter voters
     *
     * @param voters new voters value
     */
    public setVoters(voters: number): void {
        this.voters = voters;
    }

    /**
     * Getter votesCast
     *
     * @returns {number}
     */
    public getVotesCast(): number {
        return this.votesCast;
    }

    /**
     * Setter votesCast
     *
     * @param votesCast new votesCast value
     */
    public setVotesCast(votesCast: number): void {
        this.votesCast = votesCast;
    }

    /**
     * Getter votesNull
     *
     * @returns {number}
     */
    public getVotesNull(): number {
        return this.votesNull;
    }

    /**
     * Setter votesNull
     *
     * @param votesNull new votesNull value
     */
    public setVotesNull(votesNull: number): void {
        this.votesNull = votesNull;
    }

    /**
     * Getter participation
     *
     * @returns {number}
     */
    public getParticipation(): number {
        return this.participation;
    }

    /**
     * Setter participation
     *
     * @param participation new participation value
     */
    public setParticipation(participation: number): void {
        this.participation = participation;
    }

}
