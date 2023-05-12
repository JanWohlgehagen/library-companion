import {Component, OnDestroy} from '@angular/core';
import {Author, Book, User} from "../../Types/types";
import {MockDataService} from "../../mock_data/mock-data.service";
import firebase from "firebase/compat";
import {trigger} from "@angular/animations";
import {FireService} from "../../services/fire.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-browse-books',
  templateUrl: './user-browse-books.component.html',
  styleUrls: ['./user-browse-books.component.scss']
})
export class UserBrowseBooksComponent{
  public books: Book[];
  public books_cache: Book[];
  public amount_of_items_shown: number = 15;
  public amount_of_items_shown_increment_factor: number = 15;
  public searchText: string = '';



  constructor( public firebaseservice: FireService, private router : Router, private snack: MatSnackBar) {
    this.books = firebaseservice.books;
    this.books_cache = firebaseservice.cachedBooks;
  }

  increment_items_shown() {
    this.amount_of_items_shown += this.amount_of_items_shown_increment_factor;
  }
  reset_items_shown() {
    this.amount_of_items_shown = this.amount_of_items_shown_increment_factor;

    // @ts-ignore
    var ChatBoxElement = document.querySelector('#main'); //Fetch chatbox element from dom
    // @ts-ignore
    ChatBoxElement.scroll({left: 0, top: 100, behavior: 'smooth'})

  }

  set_amount_of_items_shown_increment_factor($event) {
    this.amount_of_items_shown_increment_factor = $event.value;
    this.amount_of_items_shown = $event.value;
  }

  sort_books_by($event) {
    // Sorts based on the value given by event, e.g.
    this.books.sort((book_a, book_b) => (book_a[$event.value] > book_b[$event.value]) ? 1 : -1)
  }

  filter_fiction($event) {
    if ($event.value.length === 1){
      this.books = this.books.filter(book => {
        return book.literaryType === $event.value[0];
      });
    } else this.books = this.books_cache;
  }

  add_item_to_cart(book: Book) {
    if(!this.firebaseservice.shoppingCart.find(element=> element == book))
    {
      this.firebaseservice.shoppingCart.push(book)
    }
    else {
      this.snack.open("You've already booked this book.", "Close", {duration:3000})
    }

  }

  remove_item_from_cart(book: Book) {
    this.firebaseservice.shoppingCart = this.firebaseservice.shoppingCart.filter(b => {
      return b.id != book.id;
    })
  }

  setBook(book: any) {
    this.firebaseservice.book= book
    this.router.navigate(["book-info"])

  }
}
