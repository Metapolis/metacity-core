import { Injectable } from '@angular/core';
import 'd3pie';

import { ACCIDENTGRAPHCONTENT } from './mock-chart-content/mock-pie-chart-road-accident';

@Injectable()
export class ChartContentService {
  getPieChartContent(selectedGraph: string): Promise<d3pie.ID3PieOptions> {
    if (selectedGraph === 'accidents-pie-chart') {
      return Promise.resolve(ACCIDENTGRAPHCONTENT);
    }
  }
}
