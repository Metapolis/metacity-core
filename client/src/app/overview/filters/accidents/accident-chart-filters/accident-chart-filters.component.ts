import { Component } from "@angular/core";

@Component({
  selector: "overview-accident-chart-filters",
  templateUrl: "./accident-chart-filters.component.html",
  styleUrls: ["../../generique-filters.component.scss"]
})
export class AccidentChartFiltersComponent {

  buttonList: {button: string}[] = [
    {button: "Nombre de bléssés"},
    {button: "Évolution des accidents"},
    {button: "Luminosité lors des accidents"},
    {button: "Catégories de véhicules accidentés"},
    {button: "Météo lors des accidents"},
    {button: "Âge des victimes"},
  ];
}
