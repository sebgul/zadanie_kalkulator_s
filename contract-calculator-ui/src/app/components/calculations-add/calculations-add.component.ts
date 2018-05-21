import {Component, OnInit} from '@angular/core';
import {ExchangeRatesService} from '../../services/exchange-rates.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {throwError} from 'rxjs';
import {CountriesService} from '../../services/countries.service';
import {StatesService} from '../../services/states.service';
import {CalculationsService} from '../../services/calculations.service';

@Component({
  selector: 'app-calculations-add',
  templateUrl: './calculations-add.component.html',
  styleUrls: ['./calculations-add.component.css']
})
export class CalculationsAddComponent implements OnInit {

  public countries;
  public states;
  public exchangeRatesA;
  public exchangeRatesB;
  public exchangeRatesC;

  calculationForm: FormGroup;
  validMessage = '';

  constructor(private countriesService: CountriesService,
              private statesService: StatesService,
              private calculationService: CalculationsService,
              private exchangeRateServiceA: ExchangeRatesService,
              private exchangeRateServiceB: ExchangeRatesService,
              private exchangeRateServiceC: ExchangeRatesService) {
  }

  ngOnInit() {
    this.getCountries();
    this.getStates();
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

  getStates() {
    this.statesService.getStates().subscribe(
      data => {
        this.states = data;
      },
      err => console.error(err),
      () => console.log('states loaded')
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
    if (this.calculationForm.valid) {

      // obtaining country information

      let isoCode;
      let countryName;
      let workingDaysInMonth;
      let incomeTaxRate;
      let fixedCosts;
      let countryId;

      for (const country of this.countries) {
        if (country.id = this.calculationForm.getRawValue().countryId) {
          isoCode = country.isoCode;
          workingDaysInMonth = country.workingDaysInMonth;
          incomeTaxRate = country.incomeTaxRate;
          fixedCosts = country.fixedCosts;
          countryId = country.id;
          countryName = country.name;
          break;
        }
      }

      let currencyCode;
      let plnRate = 1;

      // default plnRate 1 for Poland - in FormGroup definition
      if (isoCode !== 'POL') {
        // searching for currency code
        for (const state of this.states) {
          if (isoCode === state.alpha3Code) {
            currencyCode = state.currencies[0].code;
            break;
          }
        }

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
        this.validMessage = 'You have to pay more taxes than you earn. Your have to pay: ' + netPayStr + ' PLN.';
      } else {
        this.validMessage = 'Your net pay is: ' + netPayStr + ' PLN.';
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
          isoCode: isoCode,
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
