import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private apiKey = '47665d6cbd43b29b6127bbbdae2d5149';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=-33.5&lon=-70.6167&appid=47665d6cbd43b29b6127bbbdae2d5149&units=metric&lang=es';

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric&lang=es`;
    return this.http.get(url);
  }
}
