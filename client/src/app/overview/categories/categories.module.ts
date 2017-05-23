// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverviewRoutingModule } from '../overview-routing.module';
import { NavPannelsModule } from '../nav-pannels/nav-pannels.module';
import { MapModule } from '../map/map.module';
import { FiltersModule } from '../filters/filters.module';
import { TemplatesModule } from '../templates/templates.module';
import { ChartsModule } from '../charts/charts.module';

// Components
import { ElectionMapComponent } from './elections/election-map/election-map.component';
import { ElectionChartComponent } from './elections/election-chart/election-chart.component';
import { AccidentChartComponent } from './accidents/accident-chart/accident-chart.component';
import { AccidentMapComponent } from './accidents/accident-map/accident-map.component';


// Services

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    OverviewRoutingModule,
    NavPannelsModule,
    MapModule,
    FiltersModule,
    TemplatesModule,
    ChartsModule
  ],
  declarations: [
    ElectionMapComponent,
    ElectionChartComponent,
    AccidentChartComponent,
    AccidentMapComponent,
  ],
  providers: [

  ],
  exports: [
    ElectionMapComponent,
    ElectionChartComponent,
    AccidentChartComponent,
    AccidentMapComponent,
  ]
})
export class CategoriesModule { }
export class MyModule { }
