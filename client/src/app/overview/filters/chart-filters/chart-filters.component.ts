import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-filters',
  templateUrl: './chart-filters.component.html',
  styleUrls: ['../../overview.component.scss']
})
export class ChartFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  buttonList: {button: string}[] = [
    {button: "Nombre de bléssés"},
    {button: "Évolution des accidents"},
    {button: "Luminosité lors des accidents"},
    {button: "Catégories de véhicules accidentés"},
    {button: "Météo lors des accidents"},
    {button: "Âge des victimes"},

  ]
}
