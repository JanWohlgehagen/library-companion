import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Book, BorrowedBook} from "../../Types/types";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-user-checkout',
  templateUrl: './user-checkout.component.html',
  styleUrls: ['./user-checkout.component.scss']
})
export class UserCheckoutComponent {
  public shopping_cart: Book [];
  public order_confirmed: boolean = false;
  public user_name: string = '';
  public user_email: string = '';
  public lease_expiration: Date;

  firstFormGroup = this._formBuilder.group({
    nameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public firebase: FireService) {

    this.shopping_cart = this.firebase.shoppingCart
    this.lease_expiration = new Date()
    this.lease_expiration.setDate(this.lease_expiration.getDate() + 28)

    if(this.firebase.loggedInUser){
      this.user_name = this.firebase.loggedInUser.name
      this.user_email = this.firebase.loggedInUser.email
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
      console.log(typeof book.book.releaseYear)
      this.firebase.loggedInUser?.books?.push(book)
    })
    this.firebase.updateBorrowedBookOnUser(this.firebase.loggedInUser);
    this.firebase.shoppingCartCache = this.firebase.shoppingCart;
    this.firebase.shoppingCart = []
  }

  remove_item_from_cart(book: Book) {
    this.firebase.shoppingCart =  this.firebase.shoppingCart.filter(b => {
      return b.id != book.id;
    })
  }
}

