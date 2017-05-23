import { Injectable } from "@angular/core";
import "d3pie";

import { ACCIDENTLUMINOSITYGRAPHCONTENT } from "./mock-chart-content/accidents/mock-pie-chart-road-accident-luminosity";
import { ACCIDENTMETEOGRAPHCONTENT } from "./mock-chart-content/accidents/mock-pie-chart-road-accident-meteo";

import { ELECTION1STTOUR2012GRAPHCONTENT } from "./mock-chart-content/elections/mock-pie-chart-elections-1st-tour-2012";
import { ELECTION1STOUR2017GRAPHCONTENT } from "./mock-chart-content/elections/mock-pie-chart-elections-1st-tour-2017";
import { ELECTION2NDTOUR2012GRAPHCONTENT } from "./mock-chart-content/elections/mock-pie-chart-elections-2nd-tour-2012";
import { ELECTION2NDTOUR2017GRAPHCONTENT } from "./mock-chart-content/elections/mock-pie-chart-elections-2nd-tour-2017";



@Injectable()
export class ChartContentService {
  getPieChartContent(selectedGraph: string): Promise<d3pie.ID3PieOptions> {
    if (selectedGraph === "accidents-luminosity-pie-chart") {
      return Promise.resolve(ACCIDENTLUMINOSITYGRAPHCONTENT);
    }
    if (selectedGraph === "accidents-meteo-pie-chart") {
      return Promise.resolve(ACCIDENTMETEOGRAPHCONTENT);
    }
    if (selectedGraph === "elections-1st-2012-pie-chart") {
      return Promise.resolve(ELECTION1STTOUR2012GRAPHCONTENT);
    }
    if (selectedGraph === "elections-1st-2017-pie-chart") {
      return Promise.resolve(ELECTION1STOUR2017GRAPHCONTENT);
    }
    if (selectedGraph === "elections-2nd-2012-pie-chart") {
      return Promise.resolve(ELECTION2NDTOUR2012GRAPHCONTENT);
    }
    if (selectedGraph === "elections-2st-2017-pie-chart") {
      return Promise.resolve(ELECTION2NDTOUR2017GRAPHCONTENT);
    }
  }
}
