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

  electionColorsCandidates: {
    [candidate: string]: string
  } = {};

  constructor() { }

  getMapContent(): Promise<any> {
    if (this.selectedMap === 'accident-map') {
      this.accidentMap = new AccidentMapSpecific;
      this.accidentMapControl = new AccidentMapControl(this.accidentMap);
      return Promise.resolve(this.accidentMap);
    }
    if (this.selectedMap === 'election-map') {
      this.electionColorsCandidates['Hollande'] = '#f10d47';
      this.electionColorsCandidates['Sarkozy'] = '#0080c5';
      return Promise.resolve(new ElectionMapSpecific(
        'assets/mock-data/vote_winner.json',
        'assets/mock-data/electoral_bureau_vote_4326.geojson',
        this.electionColorsCandidates));
    }
  }

  setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }
}
