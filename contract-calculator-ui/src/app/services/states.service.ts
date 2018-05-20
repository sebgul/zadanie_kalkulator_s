import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatesService {

  constructor(private http: HttpClient) {
  }

  getStates() {
    return this.http.get('https://restcountries.eu/rest/v2/all');
  }
}
