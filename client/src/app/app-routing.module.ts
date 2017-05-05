import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components bellow
// Ex : import { HeroesComponent }      from './heroes.component';
import { GrafTestComponent }  from './graf-test/graf-test.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Ex : { path: 'heroes',     component: HeroesComponent }
  { path: 'graftest', component: GrafTestComponent },
  { path: 'sources-et-applications', component: NotFound404Component },
  { path: 'nos-services', component: NotFound404Component },
  { path: 'developpeurs', component: NotFound404Component },
  { path: 'contact', component: NotFound404Component },
  { path: 'mon-compte', component: NotFound404Component },
  { path: 'connexion', component: NotFound404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
