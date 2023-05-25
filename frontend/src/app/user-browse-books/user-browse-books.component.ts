import {Component} from '@angular/core';
import {Book} from "../../Types/types";
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-browse-books',
  templateUrl: './user-browse-books.component.html',
  styleUrls: ['./user-browse-books.component.scss']
})
export class UserBrowseBooksComponent {
  public books: Book[];
  public books_cache: Book[];
  public amount_of_items_shown: number = 15;
  public amount_of_items_shown_increment_factor: number = 15;
  public searchText: string = '';

  constructor(public firebaseService: FireService, private router : Router, private snack: MatSnackBar) {
    this.books = firebaseService.books;
    this.books_cache = firebaseService.cachedBooks;
  }

  increment_items_shown() {
    this.amount_of_items_shown = this.amount_of_items_shown_increment_factor + this.amount_of_items_shown;
  }

  reset_items_shown() {
    this.amount_of_items_shown = this.amount_of_items_shown_increment_factor;

    var ChatBoxElement = document.querySelector('#main'); //Fetch chatbox element from dom
    // @ts-ignore
    ChatBoxElement.scroll({left: 0, top: 100, behavior: 'smooth'})
  }

  set_amount_of_items_shown_increment_factor($event) {
    this.amount_of_items_shown_increment_factor = Number($event.value);
    this.amount_of_items_shown = Number($event.value);
  }

  sort_books_by($event) {
    // Sorts based on the value given by event, e.g.
    this.books.sort((book_a, book_b) => (book_a[$event.value] > book_b[$event.value]) ? 1 : -1)
  }

  filter_fiction($event) {
    if ($event.value.length === 1) {
      this.books = this.books.filter(book => {
        return book.literaryType === $event.value[0];
      });
    } else this.books = this.books_cache;
  }

  add_item_to_cart(book: Book) {
    if(!this.firebaseService.shoppingCart.find(element=> element == book))
    {
      this.firebaseService.shoppingCart.push(book)
    }
    else {
      this.snack.open("You've already booked this book.", "Close", {duration:3000})
    }
  }

  remove_item_from_cart(book: Book) {
    this.firebaseService.shoppingCart = this.firebaseService.shoppingCart.filter(b => {
      return b.id != book.id;
    })
  }

  setBook(book: any) {
    this.firebaseService.book= book
    this.router.navigate(["user-dashboard/browse-books/book-info"])
  }
}
