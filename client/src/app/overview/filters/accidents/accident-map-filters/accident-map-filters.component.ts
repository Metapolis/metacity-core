import { Component } from "@angular/core";
import { Ng2SelectModule } from "ng2-material-select";
import "hammerjs";

import { MapContentService } from "../../../shared/map-content.service";

@Component({
  selector: "overview-accident-map-filters",
  templateUrl: "./accident-map-filters.component.html",
  styleUrls: ["../../generique-filters.component.scss"]
})

export class AccidentMapFiltersComponent {
  private vehicules = [
    {value: "voiture", id: 0},
    {value: "vélo", id: 1},
    {value: "bus", id: 2}

  ];

  private multipleValuesModel = [
    {value: "voiture", id: 0},
    {value: "vélo", id: 1},
    {value: "bus", id: 2}
  ];

  private weatherFilters: Array<{name: string, code: number, value: boolean}> = [
    {name: "Pluie", code: 2, value: true},
    {name: "Vent", code: 6, value: true},
    {name: "Brouillard", code: 5, value: true},
    {name: "Beau", code: 1, value: true},
    {name: "Neige", code: 4, value: true},
  ];

  constructor(private mapcontentservice: MapContentService) { }

  private check(curentBox: HTMLInputElement) {
    this.setWeatherFilter(curentBox.value, curentBox.checked);
    this.setWeatherFilterService();
  }

  public setWeatherFilter(name: string, value: boolean) {
    for (const element in this.weatherFilters) {
      if (this.weatherFilters[element]["name"] === name) {
        this.weatherFilters[element]["value"] = value;
      }
    }
  }

  public setWeatherFilterService() {
    this.mapcontentservice.accidentMapControl.setWeatherFilter(this.weatherFilters);
  }

}
