import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PrayerTimeService } from './services/prayer-time.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digitalbond_articles';
  constructor(
  ){}
  ngOnInit(): void {
    // console.log(this.pipe.transform(Date.now(), 'dd-MM-yyyy'));
  }
}
