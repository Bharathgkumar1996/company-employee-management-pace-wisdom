import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse  } from '@angular/common/http';
import { Router } from '@angular/router';
import { map,catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApicallService {

  baseUrl : string = 'http://localhost:5000';
  token : any;
  headers
  constructor(private http : HttpClient,private router: Router)

   {
        this.token = localStorage.getItem('token');
        this.headers = new HttpHeaders
        ({
          'Content-Type': 'application/json',
          'Authorization':  "Bearer " + this.token
        })
        this.headers.append('Access-Control-Allow-Origin', '*');
        this.headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        this.headers.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
   }

   

  getHeaderAuth() {
    let headerOption = new HttpHeaders();
    return headerOption.append('Authorization', 'Bearer ' + localStorage.getItem("token"));
   }

  getAdmin() {
    return this.http.get(`${this.baseUrl}/admin/checkAdmin`, { headers: this.getHeaderAuth() }).pipe(
        catchError(this.handleError)
        ); 
    }

  handleError(error: HttpErrorResponse) {
       alert("Token Invalid");
       this.router.navigate(['/admin-login']);
       window.localStorage.removeItem('token');
       return throwError(error);
    }


 adminRegister(regObj) {
  return this.http.post(`${this.baseUrl}/admin/create`,regObj)
 }

 adminLogin(loginObj) {
  return this.http.post(`${this.baseUrl}/admin/login`,loginObj)
 }

 createCompany(companyObj)
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.post(`${this.baseUrl}/company/create`,companyObj,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }

 getallCompanies()
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.get(`${this.baseUrl}/company/getall`,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }

 createEmployee(employeeObj)
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.post(`${this.baseUrl}/employee/create`,employeeObj,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }

 getEmployee()
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.get(`${this.baseUrl}/employee/getall`,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }

 updateEmployee(employeeUpdateObj)
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.post(`${this.baseUrl}/employee/update`,employeeUpdateObj,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }

 updateCompany(updateCompanyObj)
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.post(`${this.baseUrl}/company/update`,updateCompanyObj,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }


 searchEmployee(serchEmployeeObj)
 {
  this.token = localStorage.getItem('token');
  this.headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization':  "Bearer " + this.token
  })
  return this.http.get(`${this.baseUrl}/employee/search/${serchEmployeeObj} `,{headers:this.headers}).pipe(
    catchError(this.handleError)
  )
 }




}
