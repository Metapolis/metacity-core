import { Component, OnInit } from '@angular/core';

import { MapContentService } from '../../../shared/map-content.service';

@Component({
    selector: "overview-election-chart",
    templateUrl: 'election-chart.component.html',
})
export class ElectionChartComponent implements OnInit {
  constructor(private mapcontentservice: MapContentService) {}

  ngOnInit() {
    this.setMapContent('election-chart');
  }

  setMapContent(selectedMap: string): void {
    this.mapcontentservice.setSelectedMap(selectedMap);
  }
}
