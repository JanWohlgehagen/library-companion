import { Component } from '@angular/core';
import {Author, Book, User} from "../../Types/types";
import {MockDataService} from "../../mock_data/mock-data.service";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-user-browse-books',
  templateUrl: './user-browse-books.component.html',
  styleUrls: ['./user-browse-books.component.scss']
})
export class UserBrowseBooksComponent {
  public books: Book[];
  searchText: any;

  constructor(private mock: MockDataService, private formBuilder: FormBuilder) {
    this.books = this.mock.get_books(25);

  }
}
