import { Component, OnInit } from '@angular/core';
import { Ng2SelectModule } from 'ng2-material-select';
import 'hammerjs';


@Component({
  selector: 'overview-accident-map-filters',
  templateUrl: './accident-map-filters.component.html',
  styleUrls: ['../../../templates/three-columns/three-columns-template.component.scss', './accident-map-filters.component.scss']
})
export class AccidentMapFiltersComponent implements OnInit {

  vehicules = [
      {value: 'voiture', id: 0},
      {value: 'vélo', id: 1},
      {value: 'bus', id: 2}

  ];

  multipleValuesModel = [
    {value: 'voiture', id: 0},
    {value: 'vélo', id: 1},
    {value: 'bus', id: 2}
  ];




  constructor() { }

  ngOnInit() {
  }

}
