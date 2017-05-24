// Modules
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { OverviewRoutingModule } from "../overview-routing.module";

// Components
import { GenericNavPanelComponent } from "./generic-nav-panel/generic-nav-panel.component";

// Services

@NgModule({
  imports: [
    CommonModule,
    OverviewRoutingModule
  ],
  declarations: [
    GenericNavPanelComponent
  ],
  providers: [],
  exports: [
    GenericNavPanelComponent
  ]
})
export class NavPannelsModule { }
