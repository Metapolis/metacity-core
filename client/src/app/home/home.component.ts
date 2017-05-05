import { Component } from '@angular/core';
import { Assets }    from '../assets';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
})
export class HomeComponent  {
  assets = new Assets;
}
