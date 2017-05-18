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
     * Number of votes null
     */
    private votesNull: number;

    /**
     * Number of votes cast
     */
    private votesCast: number;

    /**
     * Participation Rate
     */
    private participation: number;

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
