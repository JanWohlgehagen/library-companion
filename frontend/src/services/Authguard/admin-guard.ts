import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {FireService} from "../fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";


export function AdminGuard() {

  return () => {

    const router = inject(Router);
    const fireService = inject(FireService)
    const snackbar = inject(MatSnackBar)

    fireService.setUser()
    if(fireService.loggedInUser == undefined){

      router.navigate(["/login"])
      snackbar.open("You are not authorized, to view this page", "Close", {duration:3000})
      return false
    }
    return fireService.loggedInUser.admin;
  }

}
