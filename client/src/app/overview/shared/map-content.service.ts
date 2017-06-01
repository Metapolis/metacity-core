import { Injectable } from "@angular/core";

import { AccidentMapContent } from "../map/contents/accident-map-content";
import { ElectionMapContent } from "../map/contents/election-map-content";

import { AccidentMapControl } from "./map-control/accident-map-control";
import { ElectionMapControl } from "./map-control/election-map-control";
import { MapContent } from "../map/contents/map-specific";

@Injectable()
export class MapContentService {
  public selectedMap: string;
  public accidentMap: AccidentMapContent;
  public accidentMapControl: AccidentMapControl;
  public electionMap: ElectionMapContent;
  public electionMapControl: ElectionMapControl;
  public electionColorsCandidates: {
    [candidate: string]: string
  } = {};

  constructor() { }

  public getMapContent(): Promise<MapContent> {
    if (this.selectedMap === "accident-map") {
      this.accidentMap = new AccidentMapContent();
      this.accidentMapControl = new AccidentMapControl(this.accidentMap);
      return Promise.resolve(this.accidentMap);
    }
    if (this.selectedMap === "election-map") {
      this.electionMap = new ElectionMapContent();
      this.electionMapControl = new ElectionMapControl(this.electionMap);
      return Promise.resolve(this.electionMap);
    }
  }

  public setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }
}
