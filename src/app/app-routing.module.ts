import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import {AuthGuard} from './auth.guard'

const routes: Routes = [
  { path: '',redirectTo: "admin-login" ,pathMatch: 'full'},
  {path:"admin-login",component:LoginComponent},
  {path:"admin-register",component:RegisterComponent},
  {path:"dashboard",component:DashboardComponent , canActivate: [AuthGuard]},
  {path:"company-list",component:CompanylistComponent , canActivate: [AuthGuard]},
  {path:"company-detail",component:CompanydetailComponent , canActivate: [AuthGuard]},
  {path:"employee-detail",component:EmployeedetailComponent , canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
