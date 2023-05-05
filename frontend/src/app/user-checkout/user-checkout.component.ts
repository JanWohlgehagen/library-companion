import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MockDataService} from "../../mock_data/mock-data.service";
import {User} from "../../Types/types";
import {MatStepper} from "@angular/material/stepper";

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent {

  public user: User;
  public order_confirmed: boolean = false;

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public mock: MockDataService) {
    this.user = this.mock.get_users(1)[0];
  }

  confirm_order() {
    this.order_confirmed = true;
  }
}

