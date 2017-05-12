import { Component, OnInit } from '@angular/core';
import { Assets } from '../../assets';

@Component({
  selector: 'app-dbaccident',
  templateUrl: './dbaccident.component.html',
  styleUrls: ['./dbaccident.component.scss', '../dashboard.component.scss']
})
export class DbaccidentComponent implements OnInit {
  assets = new Assets;

  constructor() { }

  ngOnInit() {
  }

}
