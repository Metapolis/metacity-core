import { Component, OnInit } from '@angular/core';
import 'hammerjs';


@Component({
  selector: 'app-map-filters',
  templateUrl: './map-filters.component.html',
  styleUrls: ['./map-filters.component.scss', '../overview.component.scss']
})
export class MapFiltersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     var angular: any;
angular
    .module('selectDemoSelectHeader', ['ngMaterial'])
    .controller('SelectHeaderController', function($scope, $element) {
      $scope.vegetables = ['Corn' ,'Onions' ,'Kale' ,'Arugula' ,'Peas', 'Zucchini'];
      $scope.searchTerm;
      $scope.clearSearchTerm = function() {
        $scope.searchTerm = '';
      };
      // The md-select directive eats keydown events for some quick select
      // logic. Since we have a search input here, we don't need that logic.
      $element.find('input').on('keydown', function(ev) {
          ev.stopPropagation();
      });
    });
  }

}
