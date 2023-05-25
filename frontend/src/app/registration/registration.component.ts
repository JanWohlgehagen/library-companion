import {Component} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  name: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";


  constructor(public firebaseService: FireService, private matSnackbar: MatSnackBar ) {
  }

  register() {
    if (this.password == this.confirmPassword ){
      this.firebaseService.register(this.name, this.email, this.password);
    } else {
      this.matSnackbar.open("Passwords must match", 'close', {duration: 3000});
    }
  }
}
