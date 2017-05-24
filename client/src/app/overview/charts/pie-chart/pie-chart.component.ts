import { Component, OnInit } from "@angular/core";
import "d3pie";

import { ChartContentService } from "../../shared/chart-content.service";

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"],
})
export class PieChartComponent implements OnInit {

  private chartContent: d3pie.ID3PieOptions;

  constructor(private chartcontentservice: ChartContentService) {
  }

  public ngOnInit() {
    this.draw();
  }

  private async getPieChartContent(): Promise<void> {
    const answer = await this.chartcontentservice.getPieChartContent("accidents-luminosity-pie-chart");
    this.chartContent = answer;
  }

  public async draw() {
    await this.getPieChartContent();
    const chart = new d3pie("pieChart", this.chartContent);
  }

}
