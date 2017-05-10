// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';


// Components
import { Container1Component }  from './container-1/container-1.component';
import { Container2Component }  from './container-2/container-2.component';
import { HomeComponent } from './home.component';

// Services

@NgModule({
  imports:      [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    HomeComponent,
    Container1Component,
    Container2Component
   ],
})
export class HomeModule { }
