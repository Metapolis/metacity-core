// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OverviewRoutingModule } from '../overview-routing.module';

// Components
import { GenericNavPanelComponent } from './generic-nav-panel/generic-nav-panel.component';


// Services

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OverviewRoutingModule,
  ],
  declarations: [
    GenericNavPanelComponent,
  ],
  providers: [

  ],
  exports: [
    GenericNavPanelComponent,
  ]
})
export class NavPannelsModule { }
export class MyModule { }
