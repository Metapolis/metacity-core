import { ElectionMapContent } from "../../map/contents/election-map-content";

export class ElectionMapControl {
  private electionMap: ElectionMapContent;
  private roundFilter: string;
  private candidateFilter: string;
  private mockDataPath: string;
  private electionDataPath: string;
  private electionCandidateColorPath: string;
  private pollingStationPath: string;

  constructor(electionMap: ElectionMapContent) {
    this.electionMap = electionMap;
    this.mockDataPath = "assets/mock-data/";
    this.setRoundFilter("election-2012/1");
  }

  public pathCreator() {
    const arr = this.roundFilter.split("/");
    this.electionDataPath = this.mockDataPath + arr[0] + "-" + arr[1] + "-" + "winner" + ".json";
    this.electionCandidateColorPath = this.mockDataPath + arr[0] + "candidate-color" + ".json";
    this.pollingStationPath = this.mockDataPath + "polling-station-la-rochelle" + ".geojson";
  }

  public getRoundFilter(): string {
    return this.roundFilter;
  }
  public setRoundFilter(roundFilter: string) {
    this.roundFilter = roundFilter;
    this.pathCreator();
    this.electionMap.setData(this.pollingStationPath, this.electionDataPath, this.electionCandidateColorPath);
    this.electionMap.draw();
  }
}
