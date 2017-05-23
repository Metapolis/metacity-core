import { Component, OnInit } from '@angular/core';
import 'hammerjs';


@Component({
  selector: 'overview-election-map-filters',
  templateUrl: './election-map-filters.component.html',
  styleUrls: ['./election-map-filters.component.html', '../../generique-filters.component.scss']
})
export class ElectionMapFiltersComponent implements OnInit {

  private buttonListElections: {label: string, value: string}[] = [
    {label: 'Résultats du 1er tour 2012', value: 'election-2012-1'},
    {label: 'Résultats du 2nd tour 2012', value: 'election-2012-2'},
    {label: 'Résultats du 1er tour 2017', value: 'election-2017-1'},
    {label: 'Résultats du 2nd tour 2017', value: 'election-2017-2'},
  ];

  constructor() { }

  ngOnInit() {
  }
}
