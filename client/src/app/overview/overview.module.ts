// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { MaterialModule, MdButtonModule, MdCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewRoutingModule } from './overview-routing.module';
import { AppRoutingModule } from '../app-routing.module';

// Components
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { MapComponent } from './map/map.component';
import { ChartFiltersComponent } from './filters/chart-filters/chart-filters.component';
import { MapFiltersComponent } from './filters/map-filters/map-filters.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PlotComponent } from './charts/plot/plot.component';
import { OverviewComponent } from './overview.component';

// Services
import { ChartContentService } from './shared/chart-content.service';
import { MapContentService } from './shared/map-content.service';


@NgModule({
  imports: [
    CommonModule,
    LeafletModule,
    MaterialModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    OverviewRoutingModule,
    AppRoutingModule
  ],
  declarations: [
    PieChartComponent,
    MapComponent,
    ChartFiltersComponent,
    MapFiltersComponent,
    BarChartComponent,
    PlotComponent,
    OverviewComponent
  ],
  providers: [
    ChartContentService,
    MapContentService
  ]
})
export class OverviewModule { }
