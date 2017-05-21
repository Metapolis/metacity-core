import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { MapContentService } from '../../../shared/map-content.service';

@Component({
    selector: "overview-accident-map",
    templateUrl: 'accident-map.component.html',
})
export class AccidentMapComponent {
  constructor(private mapcontentservice: MapContentService) { }

  ngOnInit() {
    this.setMapContent('accident-map');
  }

  setMapContent(selectedMap: string): void {
    this.mapcontentservice.setSelectedMap(selectedMap);
  }
}
