import { Component } from '@angular/core';
import {Author, Book, User} from "../../Types/types";
import {MockDataService} from "../../mock_data/mock-data.service";

@Component({
  selector: 'app-user-browse-books',
  templateUrl: './user-browse-books.component.html',
  styleUrls: ['./user-browse-books.component.scss']
})
export class UserBrowseBooksComponent {
  public books: Book[];
  public authors: Author[];
  public users: User[];

  constructor(private mock: MockDataService) {
    this.books = this.mock.get_books(10);
    this.authors = this.mock.get_authors(5);
    this.users = this.mock.get_users(50);
    console.log(this.books)
    console.log(this.authors)
    console.log(this.users)

  }
}
