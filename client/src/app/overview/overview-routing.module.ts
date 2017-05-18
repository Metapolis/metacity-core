import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { MapComponent } from './map/map.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { MapFiltersComponent } from './filters/map-filters/map-filters.component';

const overviewRoutes: Routes = [
  { path: 'overview', component: OverviewComponent,
    children: [
      { path: 'accidents',
        children: [
          { path: 'carte', component: MapComponent },
          { path: 'analyse', component: PieChartComponent },
        ]
      },
      { path: 'elections',
        children: [
          { path: 'carte', component: MapComponent },
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
