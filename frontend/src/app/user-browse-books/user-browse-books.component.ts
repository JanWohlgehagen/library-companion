import { Component } from '@angular/core';
import {Author, Book, User} from "../../Types/types";
import {MockDataService} from "../../mock_data/mock-data.service";
import firebase from "firebase/compat";
import {trigger} from "@angular/animations";

@Component({
  selector: 'app-user-browse-books',
  templateUrl: './user-browse-books.component.html',
  styleUrls: ['./user-browse-books.component.scss']
})
export class UserBrowseBooksComponent {
  public books: Book[];
  public amount_of_items_shown: number = 24;
  public searchText: any;

  constructor(private mock: MockDataService) {
    this.books = this.mock.get_books(100);

  }

  increment_items_shown() {
    this.amount_of_items_shown += 24;
  }
  reset_items_shown() {
    this.amount_of_items_shown = 24;

    // @ts-ignore
    var ChatBoxElement = document.querySelector('#main'); //Fetch chatbox element from dom
    // @ts-ignore
    ChatBoxElement.scroll({left: 0, top: 100, behavior: 'smooth'})

  }
}
