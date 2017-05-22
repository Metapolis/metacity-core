import { ElectionMapSpecific } from '../../map/contents/election-map-content';

export class ElectionMapControl {
  electionMap: ElectionMapSpecific;
  roundFilter: any;
  candidateFilter: any;

  constructor(electionMap: ElectionMapSpecific) {
    this.electionMap = electionMap;
  }

  getRoundFilter(): any {
    return this.roundFilter;
  }
  setRoundFilter(roundFilter: any) {
    this.roundFilter = roundFilter;
  }

  getCandidateFilter(): any {
    return this.candidateFilter;
  }
  setCandidateFilter(candidateFilter: any) {
    this.candidateFilter = candidateFilter;
  }
}
