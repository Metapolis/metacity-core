// Modules
import { NgModule } from "@angular/core";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";

import { HomeModule } from "./home/home.module";
import { HeaderModule } from "./header/header.module";
import { CatalogModule } from "./catalog/catalog.module";
import { OverviewModule } from "./overview/overview.module";
import { AppRoutingModule } from "./app-routing.module";

// Components
import { AppComponent } from "./app.component";
import { NotFound404Component } from "./not-found-404/not-found-404.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { DbaccidentComponent } from "./dashboard/dbaccident/dbaccident.component";
import { DbelectionComponent } from "./dashboard/dbelection/dbelection.component";
import { DbtweetComponent } from "./dashboard/dbtweet/dbtweet.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RegisterComponent } from "./register/register.component";
import { AnimatedBackgroundComponent } from "./animated-background/animated-background.component";
import { UsedDataComponent } from "./dashboard/shared/used-data/used-data.component";
import { DashboardCardContainerComponent } from "./dashboard/shared/dashboard-card-container/dashboard-card-container.component";
import { WordcloudCardContainerComponent } from "./dashboard/shared/wordcloud-card-container/wordcloud-card-container.component";
import { SourceCardContainerComponent } from "./dashboard/shared/source-card-container/source-card-container.component";

// Services
import { MenuService } from "./shared/menu.service";
import { ConnexionService } from "./shared/connexion.service";
import { LocationService } from "./shared/location.service";
import { AssetService } from "./shared/asset.service";
import { HttpRequestService } from "./shared/http-request.service";

@NgModule({
  imports: [
    BrowserModule,
    BsDropdownModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HomeModule,
    HeaderModule,
    CatalogModule,
    OverviewModule,
    HttpModule
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
    DbtweetComponent,
    UsedDataComponent,
    DashboardCardContainerComponent,
    WordcloudCardContainerComponent,
    SourceCardContainerComponent,
  ],
  providers: [
    MenuService,
    ConnexionService,
    LocationService,
    AssetService,
    HttpRequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
