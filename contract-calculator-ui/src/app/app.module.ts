import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalculationsService} from './services/calculations.service';
import {CountriesService} from './services/countries.service';
import {StatesService} from './services/states.service';
import {CountriesListComponent} from './components/countries-list/countries-list.component';
import {CountriesAddComponent} from './components/countries-add/countries-add.component';
import {CalculationsListComponent} from './components/calculations-list/calculations-list.component';
import { CalculationsAddComponent } from './components/calculations-add/calculations-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CountriesListComponent,
    CountriesAddComponent,
    CalculationsListComponent,
    CalculationsAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [CalculationsService, CountriesService, StatesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
