import { Component, OnInit , TemplateRef} from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { ApicallService } from '../apicall.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-employeedetail',
  templateUrl: './employeedetail.component.html',
  styleUrls: ['./employeedetail.component.scss']
})
export class EmployeedetailComponent implements OnInit {
  modalRef: BsModalRef; 
  employeeID : any;
  search_term : any;
  employeeSearchArr : Array<any> = [];
  manager_info : Array <any> = [];
  sub_ordinateArr : Array <any> = [];
  sub_ord_id : any;
  manager_id : any;
  manger_name : any;
  oridnate_name : any;

  constructor(private router : Router, private route: ActivatedRoute , private apiService : ApicallService, private modalService: BsModalService) {
    this.employeeID = this.route
    .queryParams
    .subscribe(params => {
      this.search_term = params['search_term'];
    });
   this.foundEmployee();
   }

   foundEmployee()
   {
    this.employeeSearchArr = [];
    this.apiService.searchEmployee(this.search_term).subscribe((data)=>{
      if(data['docs'].length > 0)
      {
        data['docs'].forEach(emp => {
          this.employeeSearchArr.push(emp)
        });
      }
    })
   }

   openModalWithEmp(templateEmp: TemplateRef<any> , associates_Id)
   {
    
     this.manager_info = [];
     this.sub_ordinateArr = [] ;
    this.modalRef = this.modalService.show(  
      templateEmp,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
     this.apiService.getEmployee().subscribe((data)=>{  
       if(data['status'])
       {
        data['results'].forEach( emp_info => {
          if(associates_Id == emp_info._id)
          {
            this.manager_id =  emp_info.reporting_mangaer;
            this.sub_ord_id = emp_info.bind_to;
            console.log(this.manager_id , this.sub_ord_id )
          }
        });
         

        /// way to get manager ///
         
        data['results'].forEach( mng_info => {
          // console.log(mng_info,"managaer info")
          if(this.manager_id ==  mng_info._id)
          {
             this.manger_name = mng_info.employee_name;
          }
        });
        /// way to get manger ///




        /// way to get sub-ordinate ///
                
        data['results'].forEach( sub_info => {
          // console.log(mng_info,"managaer info")
          if(this.sub_ord_id == sub_info._id)
          {
            this.oridnate_name = sub_info.employee_name;
          }
        });
        /// way to get sub-ordinate ///

       }
     })
   }

  ngOnInit(): void {
  }

  
  ngOnDestroy() {
    this.employeeID.unsubscribe();
  }

}
