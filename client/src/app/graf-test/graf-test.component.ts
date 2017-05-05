import { Component } from '@angular/core';
import { geo } from './map'
import * as d3 from 'd3'
import * as L from 'leaflet'

@Component({
  selector: 'my-graftest',
  templateUrl: './graf-test.component.html',
  styleUrls : ['./graf-test.component.css']
})

export class GrafTestComponent {
  private map: geo.Map;

  constructor() {
    this.map = new geo.Map();
  }

  public draw(): void {
    this.map.draw();
  }
}
