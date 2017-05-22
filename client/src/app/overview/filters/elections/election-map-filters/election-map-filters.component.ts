import { Component, OnInit } from '@angular/core';
import 'hammerjs';


@Component({
  selector: 'overview-election-map-filters',
  templateUrl: './election-map-filters.component.html',
  styleUrls: ['./election-map-filters.component.html', '../../generique-filters.component.scss']
})
export class ElectionMapFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  buttonListElections: {button: string}[] = [
    {button: 'Résultats du 2nd tour 2012'},
  ];
}
