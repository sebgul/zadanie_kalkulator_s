import {Component, OnInit} from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import {StatesService} from '../../services/states.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';

function workingDaysInMonthValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== undefined && (isNaN(c.value) || c.value < 1 || c.value > 31)) {
    return {'grossDaily': true};
  }

  return null;
}

function incomeTaxRateValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== undefined && (isNaN(c.value) || c.value < 0.01 || c.value > 0.99)) {
    return {'grossDaily': true};
  }

  return null;
}

function fixedCostsValidator(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value !== undefined && (isNaN(c.value) || c.value < 0.01 || c.value > 10000)) {
    return {'grossDaily': true};
  }

  return null;
}

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
      workingDaysInMonth: new FormControl(22, [
        Validators.required,
        workingDaysInMonthValidator
      ]),
      incomeTaxRate: new FormControl('', [
        Validators.required,
        incomeTaxRateValidator
      ]),
      fixedCosts: new FormControl('', [
        Validators.required,
        fixedCostsValidator
      ])
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
    if (this.countryForm.getRawValue().workingDaysInMonth === '') {
      this.countryForm.patchValue({workingDaysInMonth: 22});
    }

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
      this.validMessage = 'Please fill out the form with correct values before submitting.';
    }
  }
}
