import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { AccidentMapSpecific } from '../map/contents/accident-map-content';
import { ElectionMapSpecific } from '../map/contents/election-map-content';

import { AccidentMapControl } from './map-control/accident-map-control';

@Injectable()
export class MapContentService {

  selectedMap: string;
  accidentMap: AccidentMapSpecific;
  accidentMapControl: AccidentMapControl;

  constructor() { }

  getMapContent(): Promise<any> {
    if (this.selectedMap === 'accident-map') {
      this.accidentMap = new AccidentMapSpecific;
      this.accidentMapControl = new AccidentMapControl(this.accidentMap);
      return Promise.resolve(this.accidentMap);
    }
    if (this.selectedMap === 'election-map') {
      return Promise.resolve(new ElectionMapSpecific);
    }
  }

  setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }
}
