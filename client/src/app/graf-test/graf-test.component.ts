import { Component } from '@angular/core';
import { geo } from './map'

@Component({
  selector: 'my-graftest',
  templateUrl: './graf-test.component.html',
  styleUrls : ['./graf-test.component.scss']
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
