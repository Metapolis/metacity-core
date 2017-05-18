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
