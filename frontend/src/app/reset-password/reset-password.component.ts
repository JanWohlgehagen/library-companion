import { Component } from '@angular/core';
import {FireService} from "../../services/fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(public firebaseservice: FireService, private router: Router, private matSnackbar: MatSnackBar ) {
  }

  reset() {
    if (this.newPassword == this.confirmPassword ){
      this.firebaseservice.update_password(this.newPassword).then(() => {
        this.router.navigate(["/login"])
        this.matSnackbar.open("Password reset", 'close', {duration: 3000});
      })
    } else {
      this.matSnackbar.open("Passwords must match", 'close', {duration: 3000});
    }
  }
}
