import { Component, OnInit } from '@angular/core';
import 'd3pie';

import { ChartContentService } from '../../shared/chart-content.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {

  chartContent: d3pie.ID3PieOptions;

  constructor(private chartcontentservice: ChartContentService) {
  }

  ngOnInit() {
    this.draw();
  }

  async getPieChartContent(): Promise<void> {
    const answer = await this.chartcontentservice.getPieChartContent('accidents-pie-chart');
    this.chartContent = answer;
  }

  public async draw() {
    await this.getPieChartContent();
    const chart = new d3pie('pieChart', this.chartContent);
  }

}
