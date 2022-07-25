import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contactUs:any;
  categories:any[]= [];
  constructor(
    private _GeneralService:GeneralService,
    private _CategoryService:CategoryService
  ) { }
  getContactInformation(){
    this._GeneralService.contactUs().subscribe(
      (response) => {
        this.contactUs = response.rows;
      }
    )
  }
  showCategories(){
    this._CategoryService.getCategories().subscribe(
      (response) => {
        const categoryArray = response.rows.filter(
          (array:any) => {
            return array.category_status != 0;
          }
        )
        this.categories = categoryArray;
      }
    )
  }
  ngOnInit(): void {
    this.getContactInformation();
    this.showCategories();
  }

}
