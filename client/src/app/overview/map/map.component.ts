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

  onMapReady(map: L.Map) {
    this.mapspecific.onMapReady(map);
  }


  constructor(private mapcontentservice: MapContentService) {
    this.getMapContent();
  }

  getMapContent(): void {
    // No promise for now, it is comented, the bis works without anyway
    
    //this.mapcontentservice.getMapContent('accident-map').then(answer => this.mapspecific = answer);
    this.mapspecific = this.mapcontentservice.getMapContentbis('accident-map');
  }

  ngOnInit() {}

}
