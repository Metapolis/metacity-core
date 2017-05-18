/**
 * Data transfer object with all details about a vote candidate
 */
export class CandidateDTO {

    /**
     * Candidate name
     */
    private name: string;

    /**
     * Candidate votes
     */
    private votes: number;

    /**
     * Candidate percentage
     */
    private percentage: number;

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
     * Getter votes
     *
     * @returns {number}
     */
    public getVotes(): number {
        return this.votes;
    }

    /**
     * Setter votes
     *
     * @param votes new votes value
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
