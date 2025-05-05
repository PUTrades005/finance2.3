// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, map } from 'rxjs';

export interface TimeSeriesDaily { date: string; close: number; }

interface AlphaResponse { 'Time Series (Daily)': { [date: string]: { '4. close': string } }; }

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getDailyTimeSeries(symbol: string): Observable<TimeSeriesDaily[]> {
    return this.http
      .get<AlphaResponse>(`${this.base}/daily/${symbol}`)
      .pipe(
        map(res => {
          const series = res['Time Series (Daily)'] || {};
          return Object.entries(series)
            .map(([date, data]) => ({ date, close: +data['4. close'] }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        })
      );
  }
}
