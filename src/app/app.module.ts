import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompanylistComponent } from './companylist/companylist.component';
import { CompanydetailComponent } from './companydetail/companydetail.component';
import { EmployeedetailComponent } from './employeedetail/employeedetail.component';
import {  BsModalService,  ModalModule} from 'ngx-bootstrap/modal'; 
import { NgxSpinnerModule} from 'ngx-spinner'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { AuthGuard } from './auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    CompanylistComponent,
    CompanydetailComponent,
    EmployeedetailComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    NgxSpinnerModule,
    BrowserAnimationsModule, // required animations module
    ToastNoAnimationModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuard,BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
