import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable,Subject, of } from 'rxjs';
import { ApicallService } from '../app/apicall.service';
import { map, catchError } from 'rxjs/operators';
var subject = new Subject<boolean>();


@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private _router: Router, private authservice: ApicallService) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      this.authservice.getAdmin();
      return this.authservice.getAdmin().pipe(
        map((data)=> !!window.localStorage.getItem('token') && data["status"]),
        catchError(() => of(false)),
        map(isAdmin => isAdmin || this._router.parseUrl('/admin-login'))
      );  

  }

}
