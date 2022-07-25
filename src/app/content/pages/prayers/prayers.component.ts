import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArticlesService } from 'src/app/services/articles.service';
import { PrayerTimeService } from 'src/app/services/prayer-time.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-prayers',
  templateUrl: './prayers.component.html',
  styleUrls: ['./prayers.component.scss']
})
export class PrayersComponent implements OnInit {
  loading: boolean = false;
  prayerTimeContainer:any;
  articlesViews: any[] =[];
  pipe = new DatePipe('en-US');
  articleImage:string = `${environment.imageUrl}posts/`;

  constructor(
    private _PrayerTimeService:PrayerTimeService,
    private _ArticlesService:ArticlesService
  ){}
  prayerForm: FormGroup = new FormGroup({
    'countries': new FormControl('', Validators.required)
  })
  showPrayers(){
    this.loading = true;

    this._PrayerTimeService.getPrayerTime(this.pipe.transform(Date.now(), 'dd-MM-yyyy')).subscribe(
      (data)=> {
        this.prayerTimeContainer = data.data.timings;
        this.loading = false;

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
        console.log(newArray);
        this.articlesViews = newArray;
        this.loading  = false;

      }

    )
  }
  submit(prayerForm:FormGroup){
    this.loading = true;
    this._PrayerTimeService.getPrayerTimeAndRegion(
      this.pipe.transform(Date.now(), 'dd-MM-yyyy'),
       prayerForm.value.countries
      ).subscribe(
      (data)=> {
        this.prayerTimeContainer = data.data.timings;
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
    this.showPrayers();
    this.showArticlesViews();
    // console.log(this.pipe.transform(Date.now(), 'dd-MM-yyyy'));
  }

}
