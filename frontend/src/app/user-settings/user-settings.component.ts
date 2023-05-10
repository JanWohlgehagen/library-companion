import { Component } from '@angular/core';
import {MockDataService} from "../../mock_data/mock-data.service";
import {BorrowedBook, User} from "../../Types/types";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent {
  my_borrowed_books: BorrowedBook [] = [];
  user: User;
  edit_email: boolean = false;
  edit_password: boolean = false;
  new_email: string = '';
  new_password: string = '';
  password_placeholder: string = '* * * * * * * * * * * *';

  constructor(private mock: MockDataService, private fireservice: FireService) {
    this.user = this.mock.get_users(1)[0];
    var due_date = new Date()
    var lease_date = new Date()
    lease_date.setDate(lease_date.getDate() - 5)
    due_date.setDate(lease_date.getDate() + 7)
    this.mock.get_books(4).forEach( b => { // books within expiration date
      let borrowed_book: BorrowedBook = {
        book: b,
        leaseDate: lease_date,
        dueDate: due_date,
        overDue: due_date < new Date()
      }
      this.my_borrowed_books.push(borrowed_book)
    })

    var due_date_old = new Date()
    var lease_date_old = new Date()

    lease_date_old.setDate(lease_date_old.getDate()-15)
    due_date_old.setDate(new Date().getDate()-8)
    let borrowed_book: BorrowedBook = { // expired book
      book: this.mock.get_books(1)[0],
      leaseDate: lease_date_old,
      dueDate: due_date_old,
      overDue: due_date_old < new Date()
    }
    this.my_borrowed_books.push(borrowed_book)

    this.my_borrowed_books.sort((book_a, book_b) => (book_a.overDue < book_b.overDue) ? 1 : -1)
  }

  edit_email_function(new_email: string){
    this.flip_email_state()
    //TODO call fireservice to update email of current user
  }

  flip_email_state() {
    this.edit_email = !this.edit_email
  }

  edit_password_function(new_password: string){
    this.flip_password_state()
    //TODO call fireservice to update password of current user

  }
  flip_password_state() {
    this.edit_password = !this.edit_password
  }

  updateUserAvatar($event) {
    const img = $event.target.files[0];
    //TODO call service with picture update
    console.log(img)
  }
}
