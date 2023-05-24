import {Component} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent {

  constructor(public firebaseservice: FireService, private snackbar: MatSnackBar) {

  }


  showMore() {
    const descriptionText = document.getElementById("Description-text") as HTMLElement
    if (descriptionText.style.overflow === "hidden") {
      descriptionText.style.overflow = "visible"
      descriptionText.className = "remove-gradient"
    } else {
      descriptionText.style.overflow = "hidden"
      descriptionText.className = "gradient"
    }

  }

  addToCart() {
    if (!this.firebaseservice.shoppingCart.find(element => element == this.firebaseservice.book)) {
      this.firebaseservice.shoppingCart.push(this.firebaseservice.book)
    } else {
      this.snackbar.open("You've already booked this book", "Close", {duration: 3000})
    }
  }
}
