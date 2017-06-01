// Modules
import { NgModule } from "@angular/core";

import { TemplatesModule } from "../templates/templates.module";
import { NavPannelsModule } from "../nav-pannels/nav-pannels.module";
import { MapModule } from "../map/map.module";
import { ChartsModule } from "../charts/charts.module";
import { FiltersModule } from "../filters/filters.module";

// Components
import { ElectionMapComponent } from "./elections/election-map/election-map.component";
import { ElectionChartComponent } from "./elections/election-chart/election-chart.component";
import { AccidentChartComponent } from "./accidents/accident-chart/accident-chart.component";
import { AccidentMapComponent } from "./accidents/accident-map/accident-map.component";
import { TweetChartComponent } from "./tweets/tweet-chart/tweet-chart.component";
import { SimpleCardComponent } from "../common/simple-card/simple-card.component";

// Services

@NgModule({
  imports: [
    TemplatesModule,
    NavPannelsModule,
    MapModule,
    ChartsModule,
    FiltersModule
  ],
  declarations: [
    ElectionMapComponent,
    ElectionChartComponent,
    AccidentChartComponent,
    AccidentMapComponent,
    TweetChartComponent,
    SimpleCardComponent
  ],
  providers: [],
  exports: [
    ElectionMapComponent,
    ElectionChartComponent,
    AccidentChartComponent,
    AccidentMapComponent,
    TweetChartComponent
  ]
})
export class CategoriesModule { }
