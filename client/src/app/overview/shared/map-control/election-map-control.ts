import { HttpModule, JsonpModule } from "@angular/http"

import { ElectionMapSpecific } from "../../map/contents/election-map-content";

export class ElectionMapControl {
  electionMap: ElectionMapSpecific;
  roundFilter: string;
  candidateFilter: string;
  mockDataPath: string;
  electionDataPath: string;
  electionCandidateColorPath: string;
  pollingStationPath: string;

  constructor(electionMap: ElectionMapSpecific) {
    this.electionMap = electionMap;
    this.mockDataPath = "assets/mock-data/";
    this.roundFilter = "election-2012/1";
    this.setRoundFilter(this.roundFilter);
  }

  pathCreator() {
    const arr = this.roundFilter.split("/");

    this.electionDataPath = this.mockDataPath + arr[0] + "-" + arr[1] + "-" + "winner" + ".json";
    this.electionCandidateColorPath = this.mockDataPath + arr[0] + "candidate-color" + ".json";
    this.pollingStationPath = this.mockDataPath + "polling-station-la-rochelle" + ".geojson";
  }

  getRoundFilter(): string {
    return this.roundFilter;
  }
  setRoundFilter(roundFilter: string) {
    this.roundFilter = roundFilter;
    this.pathCreator();
    this.electionMap.setData(this.pollingStationPath, this.electionDataPath, this.electionCandidateColorPath);
    this.electionMap.draw();
  }

  getCandidateFilter(): string {
    return this.candidateFilter;
  }
  setCandidateFilter(candidateFilter: string) {
    this.candidateFilter = candidateFilter;
  }
}
