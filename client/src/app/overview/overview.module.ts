// Modules
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { OverviewRoutingModule } from "./overview-routing.module";
import { CategoriesModule } from "./categories/categories.module";


// Components
import { OverviewComponent } from "./overview.component";



// Services
import { ChartContentService } from "./shared/chart-content.service";
import { MapContentService } from "./shared/map-content.service";


@NgModule({
  imports: [
    BrowserAnimationsModule,
    OverviewRoutingModule,
    CategoriesModule
  ],
  declarations: [
    OverviewComponent
  ],
  providers: [
    ChartContentService,
    MapContentService
  ],
  exports: []
})
export class OverviewModule { }
export class MyModule {}
