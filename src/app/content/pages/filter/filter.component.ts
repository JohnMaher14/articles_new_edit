import { Component,  OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { GeneralService } from 'src/app/services/general.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit  {
  error : string = ''
  loading: boolean = false;
  category:any;
  articles: any[] =[];
  indexForNumbers: any;
  articleImage:string = `${environment.imageUrl}posts/`;
  categoryImage:any = `${environment.imageUrl}Category/`;
  page!: number;
  constructor(
    private _ActivatedRoute:ActivatedRoute,
    private _GeneralService:GeneralService,
  ) { }

  ngOnInit(): void {
    this.getFilter()
  }

  getFilter(){
    this._ActivatedRoute.paramMap.subscribe(
      (params:Params) => {
        console.log(params);
        this.loading = true
        this._GeneralService.filterData(params['params'].from ,params['params'].to ).subscribe(
          (response) => {
            console.log(response);
            const filteredArticles = response.posts.filter(
              (filter:any) => {
                return filter.post_status != 0;
              }
            )
            this.articles = filteredArticles;
            this.loading = false;
            if(this.error != ''){
              this.error = '';
            }
          }, error => {
            this.loading = false;
            if(error.status == 500){
              this.error = "مفيش فالتاريخ دا مقالات";
            }
          }
        )
      }
    )
  }


}
