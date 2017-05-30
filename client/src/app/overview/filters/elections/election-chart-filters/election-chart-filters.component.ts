import { Component } from "@angular/core";

@Component({
  selector: "overview-election-chart-filters",
  templateUrl: "./election-chart-filters.component.html",
  styleUrls: ["../../generique-filters.component.scss"]
})
export class ElectionChartFiltersComponent {

  private buttonListElections: Array<{button: string}> = [
    {button: "Résultats du 1er tour 2012"},
    {button: "Résultats du 2ème tour 2012"},
    {button: "Résultats du 1er tour 2017"},
    {button: "Résultats du 2ème tour 2017"},
  ];
}