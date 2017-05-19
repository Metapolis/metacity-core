import { Injectable } from '@angular/core';

import { AccidentMapSpecific } from '../map/contents/accident-map-content';
import { ElectionMapSpecific } from '../map/contents/election-map-content';

@Injectable()
export class MapContentService {
  selectedMap: string;
  getMapContent(): Promise<AccidentMapSpecific> {
    if (this.selectedMap === 'accident-map') {
      return Promise.resolve(new AccidentMapSpecific);
    }
    if (this.selectedMap === 'election-map') {
      return Promise.resolve(new ElectionMapSpecific);
    }
  }
  setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }
}
