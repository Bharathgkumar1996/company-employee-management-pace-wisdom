import { Component, OnInit , TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import { Router , ActivatedRoute } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ApicallService } from '../apicall.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-companydetail',
  templateUrl: './companydetail.component.html',
  styleUrls: ['./companydetail.component.scss']
})
export class CompanydetailComponent implements OnInit {
  modalRef: BsModalRef; 
  employeeForm : FormGroup;
  managerForm : FormGroup;
  subordinateForm : FormGroup;
  updateCompanyForm : FormGroup;
  submitted = false;
  managerSubmitted = false;
  submitSubordinate = false;
  errors : any;
  badError : boolean;
  companyID : any;
  company_id : any;
  company_info : Array<any> = [];
  getAllEmployee :  Array<any> = [];
  managerArray : Array<any> = [];
  subOrdinate : Array<any> = [];
  company_name : any;
  isManager : boolean = false;
  update_comapny_boolean : boolean = false;
  company_exist_name : any;
  company_exist_about : any;
  
  assignRmanger = {reporting_manager : '' , employee_id : ''};
  assignSoridnate = {bindto : '' , sub_ordinate_id : ''}
  updateCompanyObj = {
    company_updateId : ""
  }
  role: any = ['manager', 'team-Lead', 'cenior-developer', 'junior-developer']

  constructor(private router : Router, private route: ActivatedRoute, private _formBuilder: FormBuilder , private modalService: BsModalService , private apiService : ApicallService,private toastrService: ToastrService,private spinner: NgxSpinnerService) { 
    this.employeeForm = this._formBuilder.group({
      employee_name : ['',[Validators.required]],
      employee_designation:['', [Validators.required]],
      employee_code: ['', [Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
      employee_contact: ['', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]],
      company_code:['']
    });
    this.managerForm = this._formBuilder.group({
      reporting_mangaer : ['',[Validators.required]],
    });
  
    this.subordinateForm =  this._formBuilder.group({
      sub_ordinate : ['',[Validators.required]],
    });

    this.updateCompanyForm =  this._formBuilder.group({
      update_company : ['',[Validators.required , Validators.minLength(5)]],
    });

    this.companyID = this.route
    .queryParams
    .subscribe(params => {
      this.company_id = params['company_id'];
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
          if(company._id == this.company_id)
          {
            this.company_info.push(company);
           this.company_name =  this.company_info[0]['company_name'];
          }
        });
      }
    })
  }


  getallEmployee()
  {
    this.apiService.getEmployee().subscribe((data)=>{
      this.getAllEmployee = [] ;
      this.managerArray = [];
      this.subOrdinate = [];
      if(data['status'])
      {
        data['results'].forEach(employee => {
           if(employee.company_code == this.company_id)
           {
             this.getAllEmployee.push(employee);
             if(employee.employee_designation == 'manager')
             {
               this.managerArray.push(employee)
             }
             if(employee.employee_designation !== 'manager')
             {
               this.subOrdinate.push(employee)
             }
           }
        });
      }
    })
  }

  get f() { return this.employeeForm.controls };
  get m() { return this.managerForm.controls };
  get s() { return this.subordinateForm.controls};
  get u() { return this.updateCompanyForm.controls}

  assignManager()
  {
    this.managerSubmitted = true;
    if(this.managerForm.valid)
    {
      let updateObj = {
        _id : this.assignRmanger.employee_id,
        reporting_mangaer : this.assignRmanger.reporting_manager
      }
       this.apiService.updateEmployee(updateObj).subscribe((data) => {
      if(data['status'])
      {
        this.modalRef.hide();
        this.toastrService.success( "Assigned Reporting Manager !!!", 'Success', {
          timeOut: 3000,
        });
        this.getallEmployee();
      }
      else{ 
        this.toastrService.error( "Oops Something Went Wrong", 'Error', {
          timeOut: 3000,
        });
        this.modalRef.hide();}
    })
    }
    else{
      this.toastrService.error( "Please Select Manager", 'Form Error', {
        timeOut: 3000,
      });
    }
  }

  changeCity(e) {
    console.log(e.value)
    this.rolename.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeManger (e) {
    this.assignRmanger.reporting_manager = e.target.value
  }

  get rolename() {
    return this.employeeForm.get('rolename');
  }

  addEmployee()
  {
    this.submitted = true;
    this.spinner.show();
    if(this.employeeForm.valid)
    {
      this.employeeForm.get('company_code').setValue(this.company_id) 
      this.apiService.createEmployee(this.employeeForm.getRawValue()).subscribe((data)=>{
        console.log(data,"data error")
        if(data['status']){
          this.spinner.hide();
          this.toastrService.success( "Employee Added", 'Success', {
            timeOut: 3000,
          });
          this.getallEmployee();
          this.employeeForm.reset();
          this.employeeForm.controls['employee_name'].setErrors(null);
          this.employeeForm.controls['employee_designation'].setErrors(null);
          this.employeeForm.controls['employee_contact'].setErrors(null);
          this.employeeForm.controls['employee_code'].setErrors(null);
        }
        else{
          this.toastrService.error( data['data'], 'Something went wrong', {
            timeOut: 3000,
          });
          this.spinner.hide();
          this.employeeForm.reset();
        }
      })
    }
    else
    {
      this.toastrService.error( "Oops", 'Fill all Employee Details', {
        timeOut: 3000,
      });
    }
  }

  openModalWithClass(template: TemplateRef<any> , employeeId) {  
        this.modalRef = this.modalService.show(  
          template,  
          Object.assign({}, { class: 'gray modal-lg' })  
        );  
        this.assignRmanger.employee_id = employeeId ; 
      }  

      ngOnDestroy() {
        this.companyID.unsubscribe();
      }


      openModalWithSubordinate(templateSubordinate: TemplateRef<any> , subordinate_Id){
        this.modalRef = this.modalService.show(  
          templateSubordinate,  
          Object.assign({}, { class: 'gray modal-lg' })  
        );  
        this.assignSoridnate.sub_ordinate_id = subordinate_Id ; 
      }

      changeSubordinate(event)
      {
        this.assignSoridnate.bindto = event.target.value;
      }

      assignSubordinate()
      {
         this.submitSubordinate = true;
         if(this.subordinateForm.valid)
    {
      let sub_ordinateObj = {
        _id : this.assignSoridnate.sub_ordinate_id,
        bind_to : this.assignSoridnate.bindto
      }
       this.apiService.updateEmployee(sub_ordinateObj).subscribe((data) => {
      if(data['status'])
      {
        this.getallEmployee();
        this.modalRef.hide();
        this.toastrService.success( "Assigned Sub-ordinates !!!", 'Success', {
          timeOut: 3000,
        });
      }
      else{ 
        this.toastrService.error( "Oops Something Went Wrong", 'Error', {
          timeOut: 3000,
        });
        this.modalRef.hide();}
    })
    }
    else{
      this.toastrService.error( "Please Select Sub-ordinates", 'Form Error', {
        timeOut: 3000,
      });
    }
      }


      openModalWithcompany(templateCompany , company_update_id)
      {
        this.company_info.forEach((exitCompany) => {
          this.company_exist_name = exitCompany.company_name;
          // this.company_exist_about = exitCompany.company_about
        })
        this.modalRef = this.modalService.show(  
          templateCompany,  
          Object.assign({}, { class: 'gray modal-lg' })  
        );  
        this.updateCompanyObj.company_updateId = company_update_id;
      }


      updateCommpany()
      {
        this.update_comapny_boolean = true;
        if(this.updateCompanyForm.valid)
        {
          let companyObj = {
              _id :  this.updateCompanyObj.company_updateId,
              company_name : this.company_exist_name,
              // company_about : this.company_exist_about
          }
          this.apiService.updateCompany(companyObj).subscribe((data)=>{
            if(data['status'])
            {
              this.getAllcompany();
              this.modalRef.hide();
              this.toastrService.success( "Company Details Updated !!!", 'Success', {
                timeOut: 3000,
              });
            }
            else{
              this.getAllcompany();
              this.modalRef.hide();
              this.toastrService.error( data['data'], 'Error', {
                timeOut: 3000,
              });
            }
          })
        }
        else{
          this.toastrService.error( "Please Fill all the details Properly", 'Error', {
            timeOut: 3000,
          });
        }
      }
    
}
