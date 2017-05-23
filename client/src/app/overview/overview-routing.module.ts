import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { AccidentMapComponent } from './categories/accidents/accident-map/accident-map.component';
import { ElectionMapComponent } from './categories/elections/election-map/election-map.component';
import { ElectionChartComponent } from './categories/elections/election-chart/election-chart.component';
import { AccidentChartComponent } from './categories/accidents/accident-chart/accident-chart.component';



const overviewRoutes: Routes = [
  { path: 'overview', component: OverviewComponent,
    children: [
      { path: 'accidents',
        children: [
          { path: 'carte', component: AccidentMapComponent },
          { path: 'analyse', component: AccidentChartComponent }
        ]
      },
      { path: 'elections',
        children: [
          { path: 'carte', component: ElectionMapComponent },
          { path: 'analyse', component: ElectionChartComponent }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(overviewRoutes) ],
  exports: [ RouterModule ]
})
export class OverviewRoutingModule {}
