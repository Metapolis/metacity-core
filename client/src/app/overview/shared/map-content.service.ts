import { Injectable } from "@angular/core";

import { AccidentMapSpecific } from "../map/contents/accident-map-content";
import { ElectionMapSpecific } from "../map/contents/election-map-content";

import { AccidentMapControl } from "./map-control/accident-map-control";
import { ElectionMapControl } from "./map-control/election-map-control";
import { MapSpecific } from "../map/contents/map-specific";

@Injectable()
export class MapContentService {
  public selectedMap: string;
  public accidentMap: AccidentMapSpecific;
  public accidentMapControl: AccidentMapControl;
  public electionMap: ElectionMapSpecific;
  public electionMapControl: ElectionMapControl;
  public electionColorsCandidates: {
    [candidate: string]: string
  } = {};

  constructor() { }

  public getMapContent(): Promise<MapSpecific> {
    if (this.selectedMap === "accident-map") {
      this.accidentMap = new AccidentMapSpecific();
      this.accidentMapControl = new AccidentMapControl(this.accidentMap);
      return Promise.resolve(this.accidentMap);
    }
    if (this.selectedMap === "election-map") {
      this.electionMap = new ElectionMapSpecific();
      this.electionMapControl = new ElectionMapControl(this.electionMap);
      return Promise.resolve(this.electionMap);
    }
  }

  public setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }
}
