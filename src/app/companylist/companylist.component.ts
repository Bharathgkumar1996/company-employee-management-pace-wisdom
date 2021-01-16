import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApicallService } from '../apicall.service';


@Component({
  selector: 'app-companylist',
  templateUrl: './companylist.component.html',
  styleUrls: ['./companylist.component.scss']
})
export class CompanylistComponent implements OnInit {
companyArr : Array <any> =[];
  constructor(private router : Router , private apiService : ApicallService) {
    this.companyArr = [];
    this.apiService.getallCompanies().subscribe((data)=>{
      if(data['status'])
      {
        data['results'].forEach(company => {
          this.companyArr.push(company)
        });
      }
    })
   }

  ngOnInit(): void {
    
  }


  viewData(companyId)
  {
    this.router.navigate(['/company-detail'],{ queryParams: { company_id: companyId }});
  }

}
