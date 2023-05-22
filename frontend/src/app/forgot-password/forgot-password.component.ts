import { Component } from '@angular/core';
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: any;


  constructor(private firebase: FireService) {
  }

  sendEmailToForgotPassword() {


  }
}
