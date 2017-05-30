import { AccidentMapSpecific } from "../../map/contents/accident-map-content";

export class AccidentMapControl {
  private accidentMap: AccidentMapSpecific;
  private weatherFilters: Array<{ name: string, code: number, value: boolean }>;

  constructor(accidentMap: AccidentMapSpecific) {
    this.accidentMap = accidentMap;
  }

  public setWeatherFilter(weatherFilters: Array<{ name: string, code: number, value: boolean }>) {
    this.weatherFilters = weatherFilters;
    this.accidentMap.setWeatherFilters(this.getWeatherFiltersList());
    this.accidentMap.refresh();
  }

  public getWeatherFiltersList() {
    const list: number[] = [];
    for (const element in this.weatherFilters) {
      if (this.weatherFilters[element]["value"]) {
        list.push(<number>this.weatherFilters[element]["code"]);
      }
    }
    return list;
  }

}