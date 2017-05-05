import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components bellow
// Ex : import { HeroesComponent }      from './heroes.component';
import { GrafTestComponent }  from './graf-test/graf-test.component'

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Ex : { path: 'heroes',     component: HeroesComponent }
  { path: 'graftest', component: GrafTestComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
