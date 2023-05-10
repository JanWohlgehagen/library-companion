import { Component } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {MockDataService} from "../../mock_data/mock-data.service";
import {Book, BorrowedBook, User} from "../../Types/types";
import {MatStepper} from "@angular/material/stepper";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent {

  public user: User;
  public shopping_cart: Book [];
  public order_confirmed: boolean = false;
  public user_name: string = '';
  public user_email: string = '';
  public lease_expiration: Date;

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public mock: MockDataService, public firebase: FireService) {
    this.user = this.mock.get_users(1)[0];
    this.shopping_cart = this.mock.get_books(5);
    this.lease_expiration = new Date()
    this.lease_expiration.setDate(this.lease_expiration.getDate() + 28)

    if(this.user){
      this.user_name = this.user.name
      this.user_email = this.user.email
    }
  }

  confirm_order() {
    this.order_confirmed = true;
    let duedate = new Date()
    this.firebase.shoppingCart.forEach(b => {
      let book : BorrowedBook={
        book: b,
        leaseDate: new Date(),
        dueDate : new Date( duedate.setDate( duedate.getDate()+28)),
        overDue :false
      }
      console.log(book)
      this.user.books?.push(book)
    })
    this.firebase.shoppingCart=[]
  }

  remove_item_from_cart(book: Book) {
    this.firebase.shoppingCart =  this.firebase.shoppingCart.filter(b => {
      return b.id != book.id;
    })
  }
}

