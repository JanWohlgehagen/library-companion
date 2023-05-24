import {Component} from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: any;
  password: any;
  checked: any;

  constructor(public firebaseservice: FireService) {

  }
}
