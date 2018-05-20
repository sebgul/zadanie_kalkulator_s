import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CalculationsService} from './services/calculations.service';
import {CountriesService} from './services/countries.service';
import {StatesService} from './services/states.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CalculationsService, CountriesService, StatesService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
