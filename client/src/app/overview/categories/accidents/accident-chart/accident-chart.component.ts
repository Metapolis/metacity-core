import { Component, OnInit } from "@angular/core";

import { MapContentService } from "../../../shared/map-content.service";

@Component({
  selector: "overview-accident-chart",
  templateUrl: "accident-chart.component.html",
})
export class AccidentChartComponent implements OnInit {
  constructor(private mapcontentservice: MapContentService) {}

  ngOnInit() {
    this.setMapContent("accident-chart");
  }

  setMapContent(selectedMap: string): void {
    this.mapcontentservice.setSelectedMap(selectedMap);
  }
}
