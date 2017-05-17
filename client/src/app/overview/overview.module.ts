// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { MaterialModule, MdButtonModule, MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';

// Components
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MapComponent } from './map/map.component';
import { PieOverviewComponent } from './pie-overview/pie-overview.component';
import { MapOverviewComponent } from './map-overview/map-overview.component';
import { ChartFiltersComponent } from './chart-filters/chart-filters.component';
import { MapFiltersComponent } from './map-filters/map-filters.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PlotComponent } from './plot/plot.component';
import { OverviewComponent } from './overview.component';

// Services
import { ChartContentService } from './shared/chart-content.service';


@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    AppRoutingModule,
  ],
  declarations: [
    PieChartComponent,
    MapComponent,
    PieOverviewComponent,
    MapOverviewComponent,
    ChartFiltersComponent,
    MapFiltersComponent,
    BarChartComponent,
    PlotComponent,
    OverviewComponent
  ],
  providers: [
    ChartContentService
  ]
})
export class OverviewModule { }
