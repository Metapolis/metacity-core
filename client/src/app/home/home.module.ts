// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


// Components
import { Container1Component } from './container-1/container-1.component';
import { Container2Component } from './container-2/container-2.component';
import { Container3Component } from './container-3/container-3.component';
import { HomeComponent } from './home.component';

// Services

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    HomeComponent,
    Container1Component,
    Container2Component,
    Container3Component
  ],
})
export class HomeModule { }
