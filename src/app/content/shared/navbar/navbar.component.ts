import { DatePipe } from '@angular/common';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CategoryService } from 'src/app/services/category.service';
import { GeneralService } from 'src/app/services/general.service';
import { PrayerTimeService } from 'src/app/services/prayer-time.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  weatherContainer:any;
  prayerTimeContainer:any;
  categories: any[] =[];
  pipe = new DatePipe('en-US');
  today: any;
  calenderArabic = new Date().toLocaleString('ar-EG', {weekday:'short' ,day: 'numeric' , month:'long' , year :'numeric'})
  artcilesFilter: any[] =[];
  todayReverse: any;
  date = new DatePipe('en-US');
  bsRangeValue!: Date[];

  minDate!: Date;
    bsValue = new Date();

  maxDate!: Date;
  dateData:any = new BehaviorSubject(null);
  constructor(
    private _PrayerTimeService:PrayerTimeService,
    private _CategoryService:CategoryService,
    private _WeatherService:WeatherService,
    private _Renderer2:Renderer2,
    private _GeneralService:GeneralService,
    private _Router:Router

  ){}
  getPrayersTime(){
    this._PrayerTimeService.getPrayerTime(this.pipe.transform(Date.now(), 'dd-MM-yyyy')).subscribe(
      (data)=> {
        this.prayerTimeContainer = data.data.timings
      }
    )
  }
  showWeather(){
    this._WeatherService.getCountry().subscribe(
      (data) => {
        this.weatherContainer = data.current;

      }
    )
  }
  showCategories(){
    this._CategoryService.getCategories().subscribe(
      (response) => {
        this.categories = response.rows
      }
    )
  }
  getTodayDate(){
    this.today = this.pipe.transform(Date.now(), 'dd-MM-yyyy')
    this.todayReverse = this.pipe.transform(Date.now(), 'yyyy-MM-dd')

  }
  openSidebar(){
    let sidebar = document.querySelector('.side')

    this._Renderer2.addClass(document.body,'on-side')
    this._Renderer2.addClass(sidebar, 'on')
  }
  closeNavbar(){
    let sidebar = document.querySelector('.side')

    this._Renderer2.removeClass(document.body,'on-side')
    this._Renderer2.removeClass(sidebar,'on');
  }
  closeSideOverlay(){
    let sidebar = document.querySelector('.side')

    this._Renderer2.removeClass(document.body,'on-side')
    this._Renderer2.removeClass(sidebar,'on');
  }
  closeBtn(){
    let sidebar = document.querySelector('.side')

    this._Renderer2.removeClass(document.body,'on-side')
    this._Renderer2.removeClass(sidebar,'on');
  }
  navOpen(){
    let sidebar = document.querySelector('.side')
    this._Renderer2.addClass(document.body,'menu-hide')
    this._Renderer2.removeClass(document.body,'on-side')
    this._Renderer2.removeClass(sidebar, 'on')
  }
  dateFilter = new FormGroup({
    'date' : new FormControl('', Validators.required),
  })

  onSubmitDate(dateFilter:FormGroup){

    this._Router.navigate([`/filter/${this.date.transform(dateFilter.value.date[0] , 'yyyy-MM-dd')}/${this.date.transform(dateFilter.value.date[1] , 'yyyy-MM-dd')}`])

  }

  ngOnInit(): void {
    this.showWeather();
    this.getPrayersTime()
    this.showCategories();
    this.getTodayDate();
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate());
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }

}
