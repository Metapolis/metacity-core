// Modules
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { HeaderModule } from './header/header.module';
import { CatalogModule } from './catalog/catalog.module';
import { OverviewModule } from './overview/overview.module';

// Components
import { AppComponent } from './app.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { DbaccidentComponent } from './dashboard/dbaccident/dbaccident.component';
import { DbelectionComponent } from './dashboard/dbelection/dbelection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { AnimatedBackgroundComponent } from './animated-background/animated-background.component';

// Services
import { MenuService } from './shared/menu.service';
import { ConnexionService } from './shared/connexion.service';


@NgModule({
  imports:      [
    BrowserModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HomeModule,
    HeaderModule,
    CatalogModule,
    OverviewModule
  ],
  declarations: [
    AppComponent,
    NotFound404Component,
    LoginComponent,
    FooterComponent,
    DbaccidentComponent,
    DbelectionComponent,
    DashboardComponent,
    RegisterComponent,
    AnimatedBackgroundComponent,
   ],
  providers: [
    MenuService,
    ConnexionService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
