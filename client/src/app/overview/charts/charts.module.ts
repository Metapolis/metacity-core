// Modules
import { NgModule } from "@angular/core";

// Components
import { PieChartComponent } from "./pie-chart/pie-chart.component";
import { BarChartComponent } from "./bar-chart/bar-chart.component";


@NgModule({
  imports: [],
  declarations: [
    PieChartComponent,
    BarChartComponent
  ],
  providers: [],
  exports: [
    PieChartComponent,
    BarChartComponent
  ]
})
export class ChartsModule { }
