import { Component, OnInit } from "@angular/core";

import * as L from "leaflet";

import { MapContentService } from "../shared/map-content.service";
import { MapSpecific } from "./contents/map-specific";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {

  private mapspecific: MapSpecific;

  private options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 1,
        maxZoom: 18,
        attribution: `© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors"`
      })
    ],
    minZoom: 1,
    zoom: 13,
    center: L.latLng({ lat: 46.1621, lng: -1.1980 })
  };

  constructor(private mapcontentservice: MapContentService) {
    // we should think about having an observable to load map content much sooner
    // this.getMapContent();
  }

  ngOnInit() { }

  private async onMapReady(map: L.Map) {
    await this.getMapContent();
    this.mapspecific.onMapReady(map);
  }

  public async getMapContent(): Promise<void> {
    const response = await this.mapcontentservice.getMapContent();
    this.mapspecific = response;
  }

}
