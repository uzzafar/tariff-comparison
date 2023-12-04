import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TariffService {
  private baseUrl = 'http://localhost:3000'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getTariffs(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tariffs`);
  }

  calculateTariffPrices(consumption: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/calculate-tariffs`, { consumption });
  }
}