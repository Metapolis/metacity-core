// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }    from '@angular/forms';


// Components
import { AppComponent }  from './app.component';
import { MenuComponent }  from './menu/menu.component';
import { GrafTestComponent }  from './graf-test/graf-test.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { VisualisationFormComponent } from './menu/visualisation-form/visualisation-form.component';
import { HomeComponent } from './home/home.component';
import { Container1Component }  from './home/container-1/container-1.component';

// Services

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    GrafTestComponent,
    NotFound404Component,
    VisualisationFormComponent,
    HomeComponent,
    Container1Component
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
