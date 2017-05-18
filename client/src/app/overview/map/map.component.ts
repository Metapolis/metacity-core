import { Component, OnInit } from '@angular/core';

import { MapContentService } from '../shared/map-content.service';
import { MapSpecific } from '../shared/mock-map-content/mock-accident-map-content';


import * as L from 'leaflet';
import * as d3 from 'd3';

interface Location {
    address: string;
    lat_lon: L.LatLngExpression;
}

interface Accident {
    id: number;
    location: Location;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [MapContentService]
})
export class MapComponent implements OnInit {
  mapspecific: MapSpecific;

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: L.latLng({ lat: 46.1621, lng: -1.1980 })
  };

  async onMapReady(map: L.Map) {
    await this.getMapContent();
    this.mapspecific.onMapReady(map);
  }


  constructor(private mapcontentservice: MapContentService) {
    // we should think about having an observable to load map content much sooner
    //this.getMapContent();
  }

  async getMapContent(): Promise<void> {
    let response = await this.mapcontentservice.getMapContent('accident-map');
    this.mapspecific = response;
  }

  ngOnInit() {}

}
