// Modules
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent }  from './app.component';
import { MenuComponent }  from './menu/menu.component';
import { GrafTestComponent }  from './graf-test/graf-test.component';

// Services

@NgModule({
  imports:      [
    BrowserModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MenuComponent,
    GrafTestComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
