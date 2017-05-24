import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

import { MapContentService } from "../../../shared/map-content.service";

@Component({
  selector: "overview-accident-map",
  templateUrl: "accident-map.component.html",
})
export class AccidentMapComponent implements OnInit {
  constructor(private mapcontentservice: MapContentService) { }

  public ngOnInit() {
    this.setMapContent("accident-map");
  }

  public setMapContent(selectedMap: string): void {
    this.mapcontentservice.setSelectedMap(selectedMap);
  }
}
