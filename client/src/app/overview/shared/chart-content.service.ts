import { Injectable } from '@angular/core';
import 'd3pie';

import { GRAPHCONTENT } from './mock-chart-content/mock-pie-chart-road-accident';

@Injectable()
export class ChartContentService {
  getPieChartContent(selectedGraph: string): d3pie.ID3PieOptions {
    if(selectedGraph == "accidents-pie-chart") {
      return GRAPHCONTENT;
    }
  }
}
