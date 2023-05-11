import { Component } from '@angular/core';
import {FireService} from "../services/fire.service";
import {Book, User} from "../Types/types";
import {MockDataService} from "../mock_data/mock-data.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User | null = null;

  constructor(public firebaseservice: FireService, private mock: MockDataService, private router: Router, private _snackbar: MatSnackBar) {
    firebaseservice.user= this.mock.get_users(1)[0];
    this.firebaseservice.shoppingCart =[]
  }

  navigateToProfile() {
    this.router.navigate(["user-dashboard/settings"])

  }

  navigateToMyBooks() {
    this.router.navigate(["user-dashboard/settings"])

  }

  navigateToSignIn() {
    this.router.navigate(["login"])

  }

  navigateToRegister() {
    this.router.navigate(["register"])

  }

  navigateToMyCart() {
    this.router.navigate(["user-dashboard/checkout"])
  }

  goToBook( b: Book) {
    this.router.navigate(["book-info"])

  }

  remove_item_from_cart($event: MouseEvent,b: Book) {
    $event.stopPropagation();
    this.firebaseservice.shoppingCart = this.firebaseservice.shoppingCart.filter( bo => bo.id !=b.id)

  }

  navigateToBrowseBooks() {
    this.router.navigate(["user-dashboard/browse-books"])
  }

  navigateToAdminManBooks() {
    this.router.navigate(["admin-dashboard/manage-books"])

  }

  navigateToAdminManUsers() {
     this.router.navigate(["admin-dashboard/manage-users"])
  }

  async signOut() {
   await this.firebaseservice.sign_out();
   this._snackbar.open("You have signed out.", "Close", {duration:3000})
  }
}
