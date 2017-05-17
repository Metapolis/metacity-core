import { Component, OnInit } from '@angular/core';
import { MapSpecific } from './accident-map';

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
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 13,
    center: L.latLng({ lat: 46.1621, lng: -1.1980 })
  };
  mapspecific: MapSpecific;

  onMapReady(map: L.Map) {
    this.mapspecific.onMapReady(map);
  }


  constructor() {
    this.mapspecific = new MapSpecific;
  }

  ngOnInit() {
  }

}
