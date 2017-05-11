// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';

// Components
import { VisualisationFormComponent } from './visualisation-form/visualisation-form.component';
import { MenuComponent } from './menu.component';

// Services

@NgModule({
  imports: [
    BrowserModule,
    CollapseModule.forRoot(),
    CommonModule,
    AppRoutingModule,
    FormsModule,
  ],
  declarations: [
    VisualisationFormComponent,
    MenuComponent,
  ],
  exports: [
    MenuComponent,
    VisualisationFormComponent,
  ]
})
export class MenuModule { }
