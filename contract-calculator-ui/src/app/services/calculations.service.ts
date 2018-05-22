import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class CalculationsService {

  constructor(private http: HttpClient) {
  }

  getCalculations() {
    return this.http.get('/api/v1/calculations');
  }

  getCalculation(id: number) {
    return this.http.get('/api/v1/calculations/' + id);
  }

  createCalculation(calculation) {
    const body = JSON.stringify(calculation);
    return this.http.post('/api/v1/calculations', body, httpOptions);
  }
}
