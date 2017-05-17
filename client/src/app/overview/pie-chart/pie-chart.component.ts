import { Component, OnInit } from '@angular/core';
import 'd3pie';

import { ChartContentService } from '../shared/chart-content.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  providers: [ChartContentService]
})
export class PieChartComponent implements OnInit {
  constructor(private chartcontentservice:ChartContentService) {
    this.getPieChartContent();
  }

  ngOnInit() {
    this.draw();
  }
  chartContent: d3pie.ID3PieOptions;
  getPieChartContent(): void {
    this.chartContent = this.chartcontentservice.getPieChartContent('accidents-pie-chart');
  }
  public draw() {
    const chart = new d3pie('pieChart',this.chartContent);
  }
}
