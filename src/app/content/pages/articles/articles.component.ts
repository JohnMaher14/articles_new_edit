import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  loading: boolean = false;
  category:any;
  articles: any[] =[];
  indexForNumbers: any;
  articleImage:string = `${environment.imageUrl}posts/`;
  categoryImage:any = `${environment.imageUrl}Category/`;
  page!: number;
  constructor(
    private _CategoryService:CategoryService,
    private _ActivatedRoute:ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getDetails()
  }
  getDetails(){
    this.indexForNumbers = this._ActivatedRoute.snapshot.params["id"];
    this._ActivatedRoute.paramMap.subscribe(
      (params:Params) => {
        this.loading = true;
        this._CategoryService.getCategoryDetails(params['params'].id).subscribe(
          (response) => {
            console.log(response);
            const newArticles = response.categoryData.post_re.filter((x:any) => {
              return x.post_status != 0;
            })
            console.log(newArticles);
            this.category = response.categoryData
            this.articles = newArticles;
            this.loading = false;


          }
        )
      }
    )
  }

}
