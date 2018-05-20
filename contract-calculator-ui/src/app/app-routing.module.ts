import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CountriesListComponent} from './components/countries-list/countries-list.component';
import {CountriesAddComponent} from './components/countries-add/countries-add.component';
import {CalculationsListComponent} from './components/calculations-list/calculations-list.component';

const routes: Routes = [
  {
    path: 'countries',
    component: CountriesListComponent
  },
  {
    path: 'countries/add',
    component: CountriesAddComponent
  },
  {
    path: 'calculations',
    component: CalculationsListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
