import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { AccidentMapComponent } from './categories/accidents/accident-map/accident-map.component';
import { ElectionMapComponent } from './categories/elections/election-map/election-map.component';

const overviewRoutes: Routes = [
  { path: 'overview', component: OverviewComponent,
    children: [
      { path: 'accidents',
        children: [
          { path: 'carte', component: AccidentMapComponent },
          { path: 'analyse', component: PieChartComponent },
        ]
      },
      { path: 'elections',
        children: [
          { path: 'carte', component: ElectionMapComponent },
          { path: 'analyse', component: PieChartComponent },
        ]
      },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(overviewRoutes) ],
  exports: [ RouterModule ]
})
export class OverviewRoutingModule {}
