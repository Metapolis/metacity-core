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
