import { AccidentMapSpecific } from '../../map/contents/accident-map-content';

export class AccidentMapControl {
  accidentMap: AccidentMapSpecific;
  weatherFilters: { name: string, code: number, value: boolean }[];
  
  constructor(accidentMap: AccidentMapSpecific) {
    this.accidentMap = accidentMap
  }

  setWeatherFilter(weatherFilters: { name: string, code: number, value: boolean }[]) {
    this.weatherFilters = weatherFilters;
    this.accidentMap.setWeatherFilters(this.getWeatherFiltersList());
    this.accidentMap.reDraw();
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
