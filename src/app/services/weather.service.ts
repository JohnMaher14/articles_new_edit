import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCountry(): Observable<any>{
    return this._HttpClient.get(`https://api.weatherapi.com/v1/current.json?key=8cda6d2677bf4924a33210845221107&q=Egypt&aqi=no`);
  }
  getCountryRegion(city:any): Observable<any>{
    return this._HttpClient.get(`https://api.weatherapi.com/v1/current.json?key=8cda6d2677bf4924a33210845221107&q=${city}&aqi=no
    `);
  }
}
