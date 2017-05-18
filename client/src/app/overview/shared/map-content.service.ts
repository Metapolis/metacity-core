import { Injectable } from '@angular/core';

import { AccidentMapSpecific } from '../map/contents/accident-map-content';

@Injectable()
export class MapContentService {
  getMapContent(selectedMap: string): Promise<AccidentMapSpecific> {
    if (selectedMap === 'accident-map') {
      return Promise.resolve(new AccidentMapSpecific);
    }
  }
}
