import { Component, OnInit } from '@angular/core';
import 'hammerjs';

import { MapContentService } from '../../../shared/map-content.service';

@Component({
  selector: 'overview-election-map-filters',
  templateUrl: './election-map-filters.component.html',
  styleUrls: ['./election-map-filters.component.html', '../../generique-filters.component.scss']
})
export class ElectionMapFiltersComponent implements OnInit {

  private current_election_layer;

  private buttonListElections: { label: string, value: string }[] = [
    { label: 'Résultats du 1er tour 2012', value: 'election-2012-1' },
    { label: 'Résultats du 2nd tour 2012', value: 'election-2012-2' },
    { label: 'Résultats du 1er tour 2017', value: 'election-2017-1' },
    { label: 'Résultats du 2nd tour 2017', value: 'election-2017-2' },
  ];

  constructor(private mapcontentservice: MapContentService) { }

  ngOnInit() {
  }

  goTo(selected: string) {
    if (selected !== this.current_election_layer) {
      this.setCurrentElectionLayer(selected);
      this.setRoundFilterService();
    }
  }

  setCurrentElectionLayer(selected: string) {
    this.current_election_layer = selected;
  }

  setRoundFilterService() {
    this.mapcontentservice.electionMapControl.setRoundFilter(this.current_election_layer);
  }
}
