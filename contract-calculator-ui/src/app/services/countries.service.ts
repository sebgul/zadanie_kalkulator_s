import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  constructor(private http: HttpClient) {
  }

  getCountries() {
    return this.http.get('/api/v1/countries');
  }

  getCountry(id: number) {
    return this.http.get('/api/v1/countries/' + id);
  }

  createCountry(country) {
    const body = JSON.stringify(country);
    return this.http.post('/api/v1/countries', body, httpOptions);
  }
}
