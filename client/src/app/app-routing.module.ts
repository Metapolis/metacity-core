import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components bellow
import { GrafTestComponent }  from './graf-test/graf-test.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DbaccidentComponent } from './dashboard/dbaccident/dbaccident.component';
import { DbelectionComponent } from './dashboard/dbelection/dbelection.component';
import { PieOverviewComponent } from './overview/pie-overview/pie-overview.component';
import { MapOverviewComponent } from './overview/map-overview/map-overview.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'graftest', component: GrafTestComponent },
  // { path: 'sources-et-applications', component: NotFound404Component },
  // { path: 'nos-services', component: NotFound404Component },
  // { path: 'developpeurs', component: NotFound404Component },
  // { path: 'contact', component: NotFound404Component },
  // { path: 'mon-compte', component: NotFound404Component },
  { path: 'accidents', component: DbaccidentComponent },
  { path: 'elections', component: DbelectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'accidents/analyse', component: PieOverviewComponent },
  { path: 'accidents/carte', component: MapOverviewComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
