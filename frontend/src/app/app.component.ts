import {Component} from '@angular/core';
import {FireService} from "../services/fire.service";
import {Book} from "../Types/types";
import {Router} from "@angular/router";
import {SeedDataService} from "../services/seed-data.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(public firebaseService: FireService, private router: Router, private data: SeedDataService, private _snackbar: MatSnackBar) {
    this.firebaseService.shoppingCart =[]

    if (!this.firebaseService.auth.currentUser)
      this.firebaseService.loggedInUser = undefined
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
    this.router.navigate(["login/register"])
  }

  navigateToMyCart() {
    this.router.navigate(["user-dashboard/checkout"])
  }

  setBook(b: Book) {
    this.firebaseService.book = b;
    this.router.navigate(["book-info"])
  }

  remove_item_from_cart($event: MouseEvent,b: Book) {
    $event.stopPropagation();
    this.firebaseService.shoppingCart = this.firebaseService.shoppingCart.filter(bo => bo.id !=b.id)
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

  SeedData($event) {
    let img = $event.target.files[0]
    this.data.seedData(img)
    this._snackbar.open("User are add to the database", "Close", {duration:3000})
  }

  seedDatabooks(){
    this.data.seedDataBooks().then(() =>{
      this._snackbar.open("Book are add to the database", "Close", {duration:3000})
    })

  }

  async signOut() {
   await this.firebaseService.sign_out();
   this._snackbar.open("You have signed out.", "Close", {duration:3000})
  }

  isAdmin():boolean{
    if(this.firebaseService.loggedInUser == undefined){
      return false;
    }
     return this.firebaseService.auth.currentUser && this.firebaseService.loggedInUser.admin
  }

  navigateToAboutUs() {
    this.router.navigate(["about-us"])
  }
}
