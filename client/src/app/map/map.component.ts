import { Component, OnInit } from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['../../../node_modules/leaflet/dist/leaflet.css', './map.component.scss']
})
export class MapComponent implements OnInit {

  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: L.latLng({ lat: 46.1621, lng: -1.1980 })
  };

  constructor() { }

  ngOnInit() {
  }

}
