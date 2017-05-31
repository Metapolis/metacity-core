import { Component } from "@angular/core";

import * as L from "leaflet";

import { MapContentService } from "../shared/map-content.service";
import { MapSpecific } from "./contents/map-specific";
import { LocationService } from "../../shared/location.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent {

  private mapspecific: MapSpecific;

  private options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: `© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors"`,
        noWrap: true
      })
    ],
    minZoom: 4,
    zoom: 13,
    maxZoom: 18,
    center: this.locationService.getCurrentLocation().gpsCoordinates.center
  };

  constructor(private mapcontentservice: MapContentService, private locationService: LocationService) {
    // we should think about having an observable to load map content much sooner
    // this.getMapContent();
  }

  private async onMapReady(map: L.Map) {
    await this.getMapContent();
    this.mapspecific.onMapReady(map);
  }

  public async getMapContent(): Promise<void> {
    const response = await this.mapcontentservice.getMapContent();
    this.mapspecific = response;
  }

}
