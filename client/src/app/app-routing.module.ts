import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components bellow
import { NotFound404Component } from './not-found-404/not-found-404.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DbaccidentComponent } from './dashboard/dbaccident/dbaccident.component';
import { DbelectionComponent } from './dashboard/dbelection/dbelection.component';
import { CatalogComponent } from './catalog/catalog.component';


const routes: Routes = [
  // Redirect root to home
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  // Real pages
  { path: 'catalog', component: CatalogComponent },
  { path: 'contact', component: NotFound404Component },
  { path: 'accidents', component: DbaccidentComponent },
  { path: 'elections', component: DbelectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'connexion', component: LoginComponent },
  { path: 'faq', component: NotFound404Component },
  { path: 'cgu', component: NotFound404Component },
  { path: 'mentions-legales', component: NotFound404Component },
  // { path: 'sources-et-applications', component: NotFound404Component },
  // { path: 'nos-services', component: NotFound404Component },
  // { path: 'developpeurs', component: NotFound404Component },
  // { path: 'mon-compte', component: NotFound404Component },
  // { path: 'accidents/analyse', component: PieOverviewComponent },
  // { path: 'accidents/carte', component: MapOverviewComponent },
  // Redirect unknow to 404 if no match
  // { path: '**', redirectTo: '/404' }, // Not working so far
  { path: '404', component: NotFound404Component },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
