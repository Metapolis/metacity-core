import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview.component';
import { MapComponent } from './map/map.component';
import { PieOverviewComponent } from './pie-overview/pie-overview.component';

const overviewRoutes: Routes = [
  { path: 'accidents/overview', component: OverviewComponent,
    children: [
      { path: 'carte', component: MapComponent },//, outlet: 'overview-center'},
      // { path: 'analyse', component: PieOverviewComponent },
    ]
  },
]

@NgModule({
  imports: [ RouterModule.forChild(overviewRoutes) ],
  exports: [ RouterModule ]
})
export class OverviewRoutingModule {}
