import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chart-filters',
  templateUrl: './chart-filters.component.html',
  styleUrls: ['../../../templates/three-columns/three-columns-template.component.scss']
})
export class AccidentChartFiltersComponent implements OnInit {

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
