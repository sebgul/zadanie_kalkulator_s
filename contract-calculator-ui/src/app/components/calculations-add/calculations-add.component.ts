import {Component, OnInit} from '@angular/core';
import {ExchangeRatesService} from '../../services/exchange-rates.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import {CountriesService} from '../../services/countries.service';
import {CalculationsService} from '../../services/calculations.service';

@Component({
  selector: 'app-calculations-add',
  templateUrl: './calculations-add.component.html',
  styleUrls: ['./calculations-add.component.css']
})
export class CalculationsAddComponent implements OnInit {

  public countries;
  public exchangeRatesA;
  public exchangeRatesB;
  public exchangeRatesC;

  calculationForm: FormGroup;
  validMessage = '';

  constructor(private countriesService: CountriesService,
              private calculationService: CalculationsService,
              private exchangeRateServiceA: ExchangeRatesService,
              private exchangeRateServiceB: ExchangeRatesService,
              private exchangeRateServiceC: ExchangeRatesService) {
  }

  ngOnInit() {
    this.getCountries();
    this.getExchangeRatesA();
    this.getExchangeRatesB();
    this.getExchangeRatesC();

    this.calculationForm = new FormGroup({
      name: new FormControl(),
      countryId: new FormControl('', Validators.required),
      grossDaily: new FormControl('', Validators.required),
      plnRate: new FormControl(1, Validators.required),
      netPay: new FormControl(0, Validators.required),
    });
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

  getExchangeRatesA() {
    this.exchangeRateServiceA.getExchangeRatesA().subscribe(
      data => {
        this.exchangeRatesA = data;
      },
      err => console.error(err),
      () => console.log('exchange rates table A loaded')
    );
  }

  getExchangeRatesB() {
    this.exchangeRateServiceB.getExchangeRatesB().subscribe(
      data => {
        this.exchangeRatesB = data;
      },
      err => console.error(err),
      () => console.log('exchange rates table B loaded')
    );
  }

  getExchangeRatesC() {
    this.exchangeRateServiceC.getExchangeRatesC().subscribe(
      data => {
        this.exchangeRatesC = data;
      },
      err => console.error(err),
      () => console.log('exchange rates table C loaded')
    );
  }

  submitCalculation() {
    // form must be valid after reset,
    // reset() function cleans default values from FormGroup definition (ngOnInit)
    this.calculationForm.patchValue({plnRate: 1});
    this.calculationForm.patchValue({netPay: 0});

    if (this.calculationForm.valid) {
      // obtaining country information

      let isoCode;
      let countryName;
      let currency;
      let currencyCode;
      let currencySymbol;
      let workingDaysInMonth;
      let incomeTaxRate;
      let fixedCosts;
      let countryId;

      for (const country of this.countries) {
        if (country.id === parseInt(this.calculationForm.getRawValue().countryId, 10)) {
          isoCode = country.isoCode;
          workingDaysInMonth = country.workingDaysInMonth;
          incomeTaxRate = country.incomeTaxRate;
          fixedCosts = country.fixedCosts;
          countryId = country.id;
          countryName = country.name;
          currency = country.currency;
          currencyCode = country.currencyCode;
          currencySymbol = country.currencySymbol;
          break;
        }
      }

      let plnRate = 1;

      // default plnRate 1 for Poland - in FormGroup definition
      if (isoCode !== 'POL') {
        // obtaining currency exchange rate in zlotys

        // searching in table C
        for (const rate of this.exchangeRatesC[0].rates) {
          if (currencyCode === rate.code) {
            plnRate = rate.ask;
            break;
          }
        }

        // if plnRate is still 1 (the right one wasn't found in table C)
        // searching in table A (less common currencies)

        if (plnRate === 1) {
          for (const rate of this.exchangeRatesA[0].rates) {
            if (currencyCode === rate.code) {
              plnRate = rate.mid;
              break;
            }
          }
        }

        // if plnRate is still 1 (the right one wasn't found in table C and A)
        // searching in table B (exotic currencies)

        if (plnRate === 1) {
          for (const rate of this.exchangeRatesB[0].rates) {
            if (currencyCode === rate.code) {
              plnRate = rate.mid;
              break;
            }
          }
        }
      }

      const grossDaily = this.calculationForm.getRawValue().grossDaily;
      const netPay = plnRate * (grossDaily * workingDaysInMonth * (1 - incomeTaxRate) - fixedCosts);

      // message for the user

      const netPayStr = netPay.toFixed(2);

      if (netPay < 0) {
        this.validMessage = 'You have to pay more taxes than you earn. Your have to pay: ' + netPayStr + ' zł.';
      } else {
        this.validMessage = 'Your net pay is: ' + netPayStr + ' zł.';
      }

      this.validMessage += ' Your calculation has been saved. Try again!';

      // building calculation object for POST
      const calculation = {
        id: this.calculationForm.getRawValue().id,
        name: this.calculationForm.getRawValue().name,
        grossDaily: grossDaily,
        plnRate: plnRate,
        netPay: netPay,
        country: {
          id: countryId,
          name: countryName,
          currency: currency,
          isoCode: isoCode,
          currencyCode: currencyCode,
          currencySymbol: currencySymbol,
          workingDaysInMonth: workingDaysInMonth,
          incomeTaxRate: incomeTaxRate,
          fixedCosts: fixedCosts
        }
      };

      this.calculationService.createCalculation(calculation).subscribe(
        data => {
          this.calculationForm.reset();
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
