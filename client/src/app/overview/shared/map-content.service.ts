import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { AccidentMapSpecific } from '../map/contents/accident-map-content';
import { ElectionMapSpecific } from '../map/contents/election-map-content';

@Injectable()
export class MapContentService {

  constructor() {
    //this.weatherFiltersListSubject.next([])
  }

  selectedMap: string;
  private weatherFiltersListSubject = new Subject<any>();
  weatherFilters: {name: string, code: number, value: boolean}[];

  getMapContent(): Promise<any> {
    if (this.selectedMap === 'accident-map') {
      return Promise.resolve(new AccidentMapSpecific);
    }
    if (this.selectedMap === 'election-map') {
      return Promise.resolve(new ElectionMapSpecific);
    }
  }
  setSelectedMap(selectedMap: string): void {
    this.selectedMap = selectedMap;
  }

  setWeatherFilter(weatherFilters: {name: string, code: number, value: boolean}[]) {
    this.weatherFilters = weatherFilters;
    this.weatherFiltersListSubject.next(this.getWeatherFiltersList());
  }

  getWeatherFilters(): Observable<any> {
    return this.weatherFiltersListSubject.asObservable();
  }

  getWeatherFiltersList() {
    let list: number[] = [];
    for (var element in this.weatherFilters) {
      if (this.weatherFilters[element]["value"]) {
        list.push(<number>this.weatherFilters[element]["code"]);
      }
    }
    return list;
  }
}
