import { Component } from '@angular/core';
import { Assets }    from '../assets';

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls : ['./menu.component.css'],
})
export class MenuComponent  {
  assets = new Assets;
}
