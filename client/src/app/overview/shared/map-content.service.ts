import { Injectable } from '@angular/core';

import { AccidentMapSpecific } from '../map/contents/accident-map-content';
import { ElectionMapSpecific } from '../map/contents/election-map-content';

@Injectable()
export class MapContentService {
  getMapContent(selectedMap: string): Promise<AccidentMapSpecific> {
    if (selectedMap === 'accident-map') {
      return Promise.resolve(new AccidentMapSpecific);
    }
    if (selectedMap === 'election-map') {
      return Promise.resolve(new ElectionMapSpecific);
    }
  }
}
