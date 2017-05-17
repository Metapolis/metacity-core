import { Injectable } from '@angular/core';

import { MapSpecific } from './mock-map-content/mock-accident-map-content';

@Injectable()
export class MapContentService {
  getMapContent(selectedMap: string): Promise<MapSpecific> {
    if (selectedMap === 'accident-map') {
      let mapspecific = new MapSpecific;
      return Promise.resolve(mapspecific);
    }
  }
  getMapContentbis(selectedMap: string): MapSpecific {
    if (selectedMap === 'accident-map') {
      let mapspecific = new MapSpecific();
      return mapspecific;
    }
  }

}
