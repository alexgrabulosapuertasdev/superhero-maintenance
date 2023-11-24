import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperheroListComponent } from './superhero/component/list/superhero-list.component';
import { SuperheroFormComponent } from './superhero/component/form/superhero-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'superhero/list',
    pathMatch: 'full',
  },
  {
    path: 'superhero/list',
    component: SuperheroListComponent,
  },
  {
    path: 'superhero/create',
    component: SuperheroFormComponent,
  },
  {
    path: 'superhero/update/:id',
    component: SuperheroFormComponent,
  },
  {
    path: '**',
    redirectTo: 'superhero/list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
