import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import the components bellow
// Ex : import { HeroesComponent }      from './heroes.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  // Ex : { path: 'heroes',     component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
