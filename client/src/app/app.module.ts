// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule }     from './app-routing.module';

// Components
import { AppComponent }  from './app.component';

// Services

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
