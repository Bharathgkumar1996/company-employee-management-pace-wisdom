import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Router} from '@angular/router';
import { MustMatch } from './mustmatch';
import { ApicallService } from '../apicall.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  VendorformGroup :  FormGroup;
  role = ["admin","user"]

  constructor(private toastrService: ToastrService, private router : Router,private _formBuilder: FormBuilder , private apiService : ApicallService ,  private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.VendorformGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      emailId:['', [Validators.required,Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      role : ['',Validators.required]
    },{
      validator: MustMatch('user_password', 'confirmPassword')
  });

  
  }

  get f() { return this.VendorformGroup.controls };

  submit()
  {
    this.spinner.show();
    this.submitted = true;
    if(this.VendorformGroup.valid)
    {
      let registerObj = {
        user_email    : this.VendorformGroup.get('emailId').value,
        user_password : this.VendorformGroup.get('user_password').value,
        user_name     : this.VendorformGroup.get('firstName').value,
        role          : this.VendorformGroup.get('role').value,
      }
      this.apiService.adminRegister(registerObj).subscribe((data) => {
          if(data['status'])
          {
            this.spinner.hide();
            this.toastrService.success( "Registered", 'Success', {
              timeOut: 3000,
            });
            this.router.navigateByUrl('admin-login')
          }
          else
          {
            this.spinner.hide();
            this.VendorformGroup.reset();
            this.toastrService.error(data['data'], 'Error', {
              timeOut: 3000,
            });
          }
      })
    }
  }

}
