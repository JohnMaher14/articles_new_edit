import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { WeatherService } from 'src/app/services/weather.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  loading: boolean = true;
  articlesViews: any[] =[];
  weatherContainer:any;
  weatherContainerDetails:any;
  articleImage:string = `${environment.imageUrl}posts/`;
  constructor(
    private _WeatherService:WeatherService,
    private _ArticlesService:ArticlesService
  ){}
  weatherForm: FormGroup = new FormGroup({
    'countries': new FormControl('', Validators.required)
  });
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
        console.log(newArray);
        this.articlesViews = newArray;
        this.loading  = false;

      }

    )
  }
  showWeather(){
    this.loading = true;

    this._WeatherService.getCountry().subscribe(
      (data)=> {
        console.log(data);
        this.weatherContainer = data.current;
        this.weatherContainerDetails = data.location;

        this.loading = false;

      }
    )
  }

  submit(weatherForm:FormGroup){
    this.loading = true;

    this._WeatherService.getCountryRegion(
       weatherForm.value.countries
      ).subscribe(
      (data)=> {
        this.weatherContainer = data.current;
        this.weatherContainerDetails = data.location;
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
    this.showWeather();
    this.showArticlesViews();
  }

}
