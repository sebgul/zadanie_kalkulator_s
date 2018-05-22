import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {StatesService} from '../../services/states.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-countries-add',
  templateUrl: './countries-add.component.html',
  styleUrls: ['./countries-add.component.css']
})
export class CountriesAddComponent implements OnInit {

  public states;
  countryForm: FormGroup;
  validMessage = '';

  constructor(private countriesService: CountriesService, private statesService: StatesService) {
  }

  ngOnInit() {
    this.getStates();

    this.countryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      currency: new FormControl(),
      isoCode: new FormControl(),
      currencyCode: new FormControl(),
      currencySymbol: new FormControl(),
      workingDaysInMonth: new FormControl(22, Validators.required),
      incomeTaxRate: new FormControl('', Validators.required),
      fixedCosts: new FormControl('', Validators.required)
    });
  }

  getStates() {
    this.statesService.getStates().subscribe(
      data => {
        this.states = data;
      },
      err => console.error(err),
      () => console.log('states loaded')
    );
  }

  submitCountry() {
    // form must be valid after reset,
    // reset() function cleans default values from FormGroup definition (ngOnInit)
    this.countryForm.patchValue({workingDaysInMonth: 22});

    if (this.countryForm.valid) {
      this.validMessage = 'New country data has been submitted. Thank you!';
      this.countryForm.patchValue({isoCode: this.countryForm.getRawValue().name.split('*')[1]});
      this.countryForm.patchValue({currency: this.countryForm.getRawValue().name.split('*')[2]});
      this.countryForm.patchValue({currencyCode: this.countryForm.getRawValue().name.split('*')[3]});
      this.countryForm.patchValue({currencySymbol: this.countryForm.getRawValue().name.split('*')[4]});
      this.countryForm.patchValue({name: this.countryForm.getRawValue().name.split('*')[0]});

      this.countriesService.createCountry(this.countryForm.value).subscribe(
        data => {
          this.countryForm.reset();
          return true;
        },
        error => {
          return throwError(error);
        }
      );
    } else {
      this.validMessage = 'Please fill out the form before submitting.';
    }
  }
}
