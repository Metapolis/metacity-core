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
import { AccidentChartFiltersComponent } from './filters/accidents/chart-filters/accident-chart-filters.component';
import { AccidentMapFiltersComponent } from './filters/accidents/map-filters/accident-map-filters.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PlotComponent } from './charts/plot/plot.component';
import { OverviewComponent } from './overview.component';
import { AccidentMapComponent } from './categories/accidents/accident-map/accident-map.component';
import { ThreeColumnsTemplateComponent } from './templates/three-columns/three-columns-template.component';

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
    AccidentChartFiltersComponent,
    AccidentMapFiltersComponent,
    BarChartComponent,
    PlotComponent,
    OverviewComponent,
    AccidentMapComponent,
    ThreeColumnsTemplateComponent,
  ],
  providers: [
    ChartContentService,
    MapContentService
  ]
})
export class OverviewModule { }
