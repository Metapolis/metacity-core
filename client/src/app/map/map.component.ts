import { Component, OnInit } from '@angular/core';

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

  onMapReady(map: L.Map) {
    const icon = {
      icon: L.icon({
        iconSize: [50, 50],
        iconAnchor: [0, 0],
        iconUrl: 'assets/markers.png',
      })
    };
    d3.json('assets/mock-data/accidents.json', (err, data) => {

      const pdata = data as Accident[];

      pdata.forEach((item, index, array) => {
          const lat_lon = [item.location.lat_lon[0] / 100000, item.location.lat_lon[1] / 100000] as L.LatLngExpression;
          L.marker(lat_lon, icon).addTo(map);
      });
    });
  }


  constructor() { }

  ngOnInit() {
  }

}
