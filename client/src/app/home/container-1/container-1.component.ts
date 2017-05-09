import { Component } from '@angular/core';
import { Assets }    from '../../assets';

@Component({
  selector: 'container-1',
  templateUrl: './container-1.component.html',
})
export class Container1Component {
  assets = new Assets;
}
