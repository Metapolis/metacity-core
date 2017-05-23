import { Client } from "elasticsearch";
import { inject, injectable } from "inversify";
import { PoliticQueryService } from "../PoliticQueryService";
import { LoggerInstance } from "winston";
import { Utils } from "../../../common/Utils";
import { Config } from "../../../Config";
import { VoteDTO } from "../dto/votes/VoteDTO";

/**
 * Implementation of {@link PoliticQueryService}
 */
@injectable()
export class PoliticQueryServiceImpl implements PoliticQueryService {

    /**
     * PoliticQueryServiceImpl logger
     *
     * @type {winston.LoggerInstance}
     */
    private logger: LoggerInstance = Utils.createLogger(PoliticQueryServiceImpl.name);

    /**
     * Politic querying service
     */
    @inject("ESClient")
    private esClient: Client;

    /**
     * Override
     */
    public async findPoliticVotes(): Promise<VoteDTO[]> {
        this.logger.info("Retrieve all politic votes in elastic search");
        const jsonVotes = (await this.esClient.search({
            index: Config.getIndexNamePolitic(),
            type: Config.getDocumentNameVote()
        })).hits;

        const votes: VoteDTO[] = [];
        for (const jsonVote of jsonVotes.hits) {
            votes.push(new VoteDTO(jsonVote._source));
        }

        return votes;
    }
}
