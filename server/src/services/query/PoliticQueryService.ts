import { VoteDTO } from "./dto/votes/VoteDTO";
/**
 * Contains method to perform traffic query
 */
export interface PoliticQueryService {

    /**
     * Retrieves all politic votes accident
     * @returns {string}
     */
    findPoliticVotes(): Promise<VoteDTO[]>;
}
