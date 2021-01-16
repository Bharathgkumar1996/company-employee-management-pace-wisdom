import {Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import {NgxSpinnerService } from 'ngx-spinner';
import {ApicallService} from '../apicall.service'
import {ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  companyForm : FormGroup;
  searchForm : FormGroup;
  searchSubmitted = false;
  submitted = false;
  errors : any;
  badError : boolean;
  company_info : Array<any> = [];
  getAllEmployee : Array<any> = [];

  constructor(private router : Router,private _formBuilder: FormBuilder,private apiService : ApicallService , private toastrService: ToastrService , private spinner: NgxSpinnerService) { 
    this.companyForm = this._formBuilder.group({
      company_code:['', [Validators.required,Validators.minLength(5),Validators.maxLength(5)]],
      company_name: ['', [Validators.required,Validators.minLength(5)]],
      company_about : ['',[Validators.required,Validators.minLength(10)]]
    });

    this.searchForm = this._formBuilder.group({
      search_employee:['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getAllcompany();
    this.getallEmployee();
  }

  getAllcompany()
  {
    this.apiService.getallCompanies().subscribe((data)=>{
      this.company_info = [];
      if(data['status'])
      {
        data['results'].forEach(company => {
          this.company_info.push(company);
        });
      }
    })
  }

  getallEmployee()
  {
    this.apiService.getEmployee().subscribe((data)=>{
      this.getAllEmployee = [] ;
      if(data['status'])
      {
        data['results'].forEach(employee => {
          this.getAllEmployee.push(employee);
        });
      }
    })
  }

  get f()   { return this.companyForm.controls };
  get s()   { return this.searchForm.controls };

 
  addCompany()
  {
  this.submitted = true;
  this.spinner.show();
  if(this.companyForm.valid)
  {
    
    this.companyForm.setErrors({company_code:null})
    this.apiService.createCompany(this.companyForm.getRawValue()).subscribe((data)=>{
      if(data['status'])
      {
        this.spinner.hide();
        this.toastrService.success( "Company Added Succesfully", 'Success', {
          timeOut: 3000,
        });
        this.companyForm.reset();
    this.companyForm.controls['company_code'].setErrors(null);
    this.companyForm.controls['company_name'].setErrors(null);
    this.companyForm.controls['company_about'].setErrors(null);
      }
      else{
        this.toastrService.error(data['data'], 'Error', {
          timeOut: 3000,
        });
        this.companyForm.reset();
      }
    })
  }
  else {this.toastrService.error( 'Required Fields', 'Error', {
    timeOut: 3000,
  })
  this.spinner.hide();
}
}

searchEmployee()
{
  this.searchSubmitted = true;
  if(this.searchForm.valid)
  {
    this.router.navigate(['/employee-detail'],{ queryParams: { search_term: this.searchForm.get('search_employee').value }});
  }
}

showCompany()
{
  this.router.navigateByUrl("company-list")
}

}
