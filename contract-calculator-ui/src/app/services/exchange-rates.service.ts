import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRatesService {

  constructor(private http: HttpClient) {
  }

  getExchangeRatesA() {
    return this.http.get('http://api.nbp.pl/api/exchangerates/tables/a?format=json');
  }

  getExchangeRatesB() {
    return this.http.get('http://api.nbp.pl/api/exchangerates/tables/b?format=json');
  }

  getExchangeRatesC() {
    return this.http.get('http://api.nbp.pl/api/exchangerates/tables/c?format=json');
  }
}
