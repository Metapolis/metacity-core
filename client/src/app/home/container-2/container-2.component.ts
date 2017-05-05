import { Component } from '@angular/core';
import { Assets }    from '../../assets';

@Component({
  selector: 'container-2',
  templateUrl: './container-2.component.html',
})
export class Container2Component {
  assets = new Assets;
}
