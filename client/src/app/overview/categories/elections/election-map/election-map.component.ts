import { Component, OnInit } from "@angular/core";

import { MapContentService } from "../../../shared/map-content.service";

@Component({
  selector: "overview-election-map",
  templateUrl: "election-map.component.html",
})
export class ElectionMapComponent implements OnInit {
  constructor(private mapcontentservice: MapContentService) {}

  public ngOnInit() {
    this.setMapContent("election-map");
  }

  public setMapContent(selectedMap: string): void {
    this.mapcontentservice.setSelectedMap(selectedMap);
  }
}
