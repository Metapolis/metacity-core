import { Component } from '@angular/core';
import { Assets } from '../../assets';

@Component({
  selector: 'catalog-container-1',
  templateUrl: './container-1.component.html',
  styleUrls: ['../catalog.component.scss']
})
export class Container1Component {
  assets = new Assets;
}
