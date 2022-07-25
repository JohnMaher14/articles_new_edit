import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  success = '';
  contactUs: any;
  loading: boolean = false;
  constructor(
    private _GeneralService:GeneralService
  ) { }
  contactUsForm: FormGroup =  new FormGroup ({
    'name' : new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    'phone' : new FormControl('', [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
    'email' : new FormControl('', [Validators.required , Validators.email]),
    'message' : new FormControl('', Validators.required),
  })
  submit(contactUsForm:FormGroup){
    this.loading = true;
    this._GeneralService.sendMessage(contactUsForm.value).subscribe(
      (response) => {
        console.log(response.ar_success);
        this.success = response.ar_success;
        this.loading = false;
        contactUsForm.reset();
      }
    )
  }
  showContactUs(){
    this.loading = true;
    this._GeneralService.contactUs().subscribe(
      (response) =>{
        console.log(response.rows);
        this.contactUs = response.rows;
        this.loading = false;

      }
    )
  }
  ngOnInit(): void {
    this.showContactUs();
  }

}
