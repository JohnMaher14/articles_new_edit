import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getCategories(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}category_index`)
  }
  getCategoryDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}categoryData?category_id=${id}`)
  }
}
