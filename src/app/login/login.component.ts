import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import {ApicallService} from '../apicall.service'
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  vendorLoginformGroup : FormGroup;
  submitted = false;
  errors : any;
  badError : boolean;

  constructor( private router : Router, private toastrService: ToastrService ,private _formBuilder: FormBuilder , private spinner: NgxSpinnerService,private apiService : ApicallService) {
    this.vendorLoginformGroup = this._formBuilder.group({
      user_email:['', [Validators.required,Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
    });
    // this.spinner.show();
   }

  ngOnInit(): void {
  }
  get f() { return this.vendorLoginformGroup.controls };

  login()
  {
  this.submitted = true;
  this.spinner.show();
  if(this.vendorLoginformGroup.valid)
  {
    this.apiService.adminLogin(this.vendorLoginformGroup.getRawValue()).subscribe((data)=>{
      if(data['token'])
      {
        window.localStorage.setItem('token',data['token'])
        this.spinner.hide();
        this.toastrService.success( "LoggedIn", 'Success', {
          timeOut: 3000,
        })
        this.router.navigateByUrl('dashboard');
      }
      else{
        this.spinner.hide();
        this.toastrService.error(data['data'], 'Error', {
          timeOut: 3000,
        });
        this.vendorLoginformGroup.reset();
      }
    })
  }
}

register()
{
  this.router.navigateByUrl('admin-register')
}
}
