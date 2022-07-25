import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrayerTimeService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getPrayerTime(date:any): Observable<any>{
    return this._HttpClient.get(`https://api.aladhan.com/v1/timingsByAddress/${date}?address=Giza,Egypt&method=8`);
  }
  getPrayerTimeAndRegion(date:any, city:any): Observable<any>{
    return this._HttpClient.get(`https://api.aladhan.com/v1/timingsByAddress/${date}?address=${city}&method=8`);
  }
}
