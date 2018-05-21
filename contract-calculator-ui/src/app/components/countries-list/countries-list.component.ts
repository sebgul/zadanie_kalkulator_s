import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {

  public countries;

  constructor(private countriesService: CountriesService) {
  }

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countriesService.getCountries().subscribe(
      data => {
        this.countries = data;
      },
      err => console.error(err),
      () => console.log('countries loaded')
    );
  }
}
