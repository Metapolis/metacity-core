// Modules
import { NgModule }      from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule }    from '@angular/forms';
import { HomeModule }     from './home/home.module';
import { HeaderModule }     from './header/header.module';
import { LeafletModule } from '@asymmetrik/angular2-leaflet';
import { CatalogModule }     from './catalog/catalog.module';

// Components
import { AppComponent }  from './app.component';
import { GrafTestComponent }  from './graf-test/graf-test.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { DbaccidentComponent } from './dashboard/dbaccident/dbaccident.component';
import { DbelectionComponent } from './dashboard/dbelection/dbelection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AnimatedBackgroundComponent } from './animated-background/animated-background.component';
import { OverviewComponent } from './overview/overview.component';
import { PieChartComponent } from './overview/pie-chart/pie-chart.component';
import { MapComponent } from './map/map.component';
import { PieOverviewComponent } from './overview/pie-overview/pie-overview.component';
import { MapOverviewComponent } from './overview/map-overview/map-overview.component';
import { ChartFiltersComponent } from './overview/chart-filters/chart-filters.component';


// Services

@NgModule({
  imports:      [
    BrowserModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HomeModule,
    HeaderModule,
    LeafletModule,
    CatalogModule
  ],
  declarations: [
    AppComponent,
    GrafTestComponent,
    NotFound404Component,
    LoginComponent,
    FooterComponent,
    DbaccidentComponent,
    DbelectionComponent,
    DashboardComponent,
    RegisterComponent,
    AnimatedBackgroundComponent,
    OverviewComponent,
    PieChartComponent,
    MapComponent,
    PieOverviewComponent,
    MapOverviewComponent,
    ChartFiltersComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
