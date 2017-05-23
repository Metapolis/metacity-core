import { ElectionMapSpecific } from '../../map/contents/election-map-content';

export class ElectionMapControl {
  electionMap: ElectionMapSpecific;
  roundFilter: string;
  candidateFilter: string;

  constructor(electionMap: ElectionMapSpecific) {
    this.electionMap = electionMap;
  }

  getRoundFilter(): string {
    return this.roundFilter;
  }
  setRoundFilter(roundFilter: string) {
    this.roundFilter = roundFilter;
    this.electionMap.setRoundFilter(this.getRoundFilter());
  }

  getCandidateFilter(): string {
    return this.candidateFilter;
  }
  setCandidateFilter(candidateFilter: string) {
    this.candidateFilter = candidateFilter;
  }
}
