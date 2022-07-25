import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private _HttpClient:HttpClient
  ) { }
  getArticles(): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}post_index`)
  }
  getArticleDetails(id:number): Observable<any>{
    return this._HttpClient.get(`${environment.apiUrl}postData?post_id=${id}`)
  }
  createComment(
    title:string,
    text:string,
    post_id:any,
    comment_status:any,
  ): Observable<any>{
    var formData = new FormData();
    formData.append('title',title);
    formData.append('text',text);
    formData.append('post_id',post_id);
    formData.append('comment_status',comment_status);
    return this._HttpClient.post(`${environment.apiUrl}comment_store`, formData);
  }
}
