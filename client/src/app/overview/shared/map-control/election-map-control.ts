import { ElectionMapSpecific } from '../../map/contents/election-map-content';

export class ElectionMapControl {
  electionMap: ElectionMapSpecific;

  constructor(electionMap: ElectionMapSpecific) {
    this.electionMap = electionMap;
  }
}
