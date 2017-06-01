import { Component, OnInit } from "@angular/core";

import { ChartContentService } from "../../../shared/chart-content.service";

@Component({
  selector: "overview-accident-chart",
  templateUrl: "accident-chart.component.html",
})
export class AccidentChartComponent implements OnInit {
  constructor(private chartContentService: ChartContentService) {}

  public ngOnInit() {
    // this.setChartContent("accidents-luminosity-pie-chart");
    this.setChartContent("accidents-meteo-pie-chart");
  }

  public setChartContent(selectedChart: string): void {
    this.chartContentService.setSelectedChart(selectedChart);
  }
}
