import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {FireService} from "./fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthguardAdminService implements CanActivate{

  constructor(private fireservice: FireService, private router: Router, private snackbar: MatSnackBar) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.fireservice.loggedInUser = this.fireservice.setUser()
    if(this.fireservice.loggedInUser == undefined){
      this.router.navigate(["login"])
      this.snackbar.open("You are not authorized, to view this page", "Close", {duration:3000})
      return false
    }
   return this.fireservice.loggedInUser.admin;
  }
}
