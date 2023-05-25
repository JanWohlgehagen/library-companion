import {Component} from '@angular/core';
import {BorrowedBook, User} from "../../Types/types"
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs"
import {FireService} from "../../services/fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss']
})
export class AdminManageUsersComponent {
  formControl= new FormControl('');
  filteredUsers: Observable<User[]> | undefined
  Users: User[] = []
  searchText: string = "";
  start: number = 0;
  end: number = 30;

  constructor(public fireService: FireService, private snackback: MatSnackBar) {
    this.getUsers()

    this.filteredUsers = this.formControl.valueChanges.pipe(startWith(null),
      map((value: string | null) =>
        (value ? this._filter(value) : this.Users.slice())),)
  }

  getUsers() {
    this.Users = this.fireService.users
  }

  extendBook(u: User, b: BorrowedBook) {
    b.dueDate.setDate(b.dueDate.getDate() + 14);
    var replaceindex = u.books?.findIndex(element => element = b)
    // @ts-ignore
    u.books[replaceindex] = b;

    if (b.dueDate > new Date()) {
      b.overDue = false;
    }
    this.fireService.updateBorrowedBookOnUser(u)
  }

  sendMail(u: User, b: BorrowedBook) {
    this.fireService.sendMail(u, b)
    this.snackback.open("You've sent a mail to: " + u.name, "Ok", {duration: 3000})
  }

  MoveForward() {
    this.start += 30;
    this.end += 30;
  }

  MoveBack() {
    this.start -= 30;
    this.end -= 30;
  }

  _filter(value: string): User[] {
    var searchText = value.toLowerCase();

    return this.Users.filter(it => {
      return it.name.toLocaleLowerCase().includes(searchText) || it.email.toLocaleLowerCase().includes(searchText)
    });
  }


  deleteUser(u: User) {
    this.Users = this.Users.filter(user => {
      return user.id != u.id
    })
    this.filteredUsers = this.formControl.valueChanges.pipe(startWith(null),
      map((value: string | null) =>
        (value ? this._filter(value) : this.Users.slice())),)

    this.fireService.deleteUser(u);
  }

  deliverBook(u: User, b: BorrowedBook) {
    u.books = u.books?.filter(book => {
      return b != book
    })
    this.fireService.updateBorrowedBookOnUser(u);
  }
}
