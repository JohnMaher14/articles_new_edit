import { Component, OnInit } from '@angular/core';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  loading: boolean = false;
  aboutUs:any;
  aboutUsImage:string = 'https://digitalbondmena.com/aklny/about_us_page/';

  constructor(
    private _GeneralService:GeneralService,
    _NgbAccordionConfig: NgbAccordionConfig
  ) {
    _NgbAccordionConfig.closeOthers = true;
    _NgbAccordionConfig.type = 'info';
  }
  showAboutUs(){
    this.loading = true;
    this._GeneralService.aboutUs().subscribe(
      (response) => {
        this.aboutUs = response.rows;
        this.loading = false;

        console.log(response);
      }
    )
  }
  ngOnInit(): void {
    this.showAboutUs()

  }

}
