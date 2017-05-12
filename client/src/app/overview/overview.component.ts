import { Component, OnInit } from '@angular/core';
import { Assets } from '../assets';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  assets = new Assets;

  constructor() { }

  ngOnInit() {
  }

}
