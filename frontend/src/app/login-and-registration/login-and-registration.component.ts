import { Component } from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-login-and-registration',
  templateUrl: './login-and-registration.component.html',
  styleUrls: ['./login-and-registration.component.scss']
})
export class LoginAndRegistrationComponent {
  email: any;
  password: any;
  checked: any;


  constructor(public firebaseservice: FireService ) {

  }
}
