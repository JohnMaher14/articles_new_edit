import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  private subject = new Subject<any>();

  aboutUs(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}about_us_page_index`)
  }
  contactUs(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}contact_us_index`)
  }
  getCommentsIndex(id:number) : Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}comment_index/${id}`)
  }
  sendMessage(formData:any):Observable<any>{
    return this._HttpClient.post(`${environment.apiUrl}sendMessage`, formData)
  }
  filterData(start_date:any , endDate:any) :Observable<any> {
    const params = new HttpParams()
    .set('start_date', start_date)
    .set('endDate', endDate);
    return this._HttpClient.post(`${environment.apiUrl}search`  ,
    params
    )
  }

  sendData(article: any[]) {
      this.subject.next(article);
  }

  getData(): Observable<any[]> {
      return this.subject.asObservable();
  }
}
