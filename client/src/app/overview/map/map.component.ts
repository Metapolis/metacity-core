import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

import { MapContentService } from '../shared/map-content.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  constructor(private mapcontentservice: MapContentService) {
    // we should think about having an observable to load map content much sooner
    //this.getMapContent();
  }
  ngOnInit() {}

  mapspecific: any;

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

  async getMapContent(): Promise<void> {
    let response = await this.mapcontentservice.getMapContent('accident-map');
    this.mapspecific = response;
  }

}
