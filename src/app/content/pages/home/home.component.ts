import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ArticlesService } from 'src/app/services/articles.service';
import { CategoryService } from 'src/app/services/category.service';
import { environment } from 'src/environments/environment';
import { Params } from '@angular/router';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  articlesViews: any[] = [];
  categories: any[] = [];
  loading : boolean = false;
  articleImage:string = `${environment.imageUrl}posts/`;
  categoryImage:string = `${environment.imageUrl}Category/`;
  constructor(
    private _ArticlesService:ArticlesService,
    private _CategoryService:CategoryService
  ) { }

  ngOnInit(): void {
    this.showAticles();
    this.showCategories();
    this.showArticlesViews();
  }
  showAticles(){
    this.loading  = true;
    this._ArticlesService.getArticles().subscribe(
      (response) => {
        const newArticles = response.row.filter((x:any) => {
          return x.post_status != 0 ;
        })

        this.articles = newArticles;
        this.loading  = false;

      }

    )
  }

  showArticlesViews(){
    this.loading  = true;
    this._ArticlesService.getArticles().subscribe(
      (response) => {
        // this.articles = response.row
        const newArray =  response.row.sort(
          (views:any , view_counter:any)=> {
            return view_counter.view_counter - views.view_counter;
          }
        ).filter((x:any) => {
          return x.post_status != 0;
        })
        this.articlesViews = newArray;
        this.loading  = false;

      }

    )
  }
  showCategories(){
    this.loading  = true;

    this._CategoryService.getCategories().subscribe(
      (response) => {
        this.categories = response.rows

      }
    )
  }
  // showArticlesByView(){
  //   this._ArticlesService.getArticles().subscribe(
  //     (response) => {
  //       this.articles = response.row

  //           this.articles.map(ele => {
  //             console.log(ele.view_counter);
  //             let splitCode = ele.view_counter;
  //             ele.parent = splitCode;
  //             ele.level = splitCode.length;

  //             this.articles.push(ele)
  //             this.articlesViews = _.sortBy(this.articles,
  //               (item) => {

  //               return item.view_counter;
  //             })

  //             console.log(this.articlesViews);
  //           })
  //       // this.articles = response.row
  //       // console.log(_.sortBy());
  //     }
  //   )
  // }
  newsSlider: OwlOptions = {
    autoplay: true,
    autoplayTimeout:3000,
    dots: false,
    rtl: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      }

    },
    nav: true,
    navText: [
      "<i class='fa fa-angle-left'></i>",
                    "<i class='fa fa-angle-right'></i>"
    ]

  }
}
