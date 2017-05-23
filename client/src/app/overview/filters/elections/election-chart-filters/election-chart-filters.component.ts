import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'overview-election-chart-filters',
  templateUrl: './election-chart-filters.component.html',
  styleUrls: ['../../generique-filters.component.scss']
})
export class ElectionChartFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  buttonListElections: {button: string}[] = [
    {button: "Résultats du 1er tour 2012"},
    {button: "Résultats du 2ème tour 2012"},
    {button: "Résultats du 1er tour 2017"},
    {button: "Résultats du 2ème tour 2017"},

  ]
}
