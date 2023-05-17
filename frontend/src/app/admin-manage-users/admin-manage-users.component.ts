import { Component} from '@angular/core';
import {MockDataService} from "../../mock_data/mock-data.service";
import {BorrowedBook, User} from "../../Types/types"
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs"
import {FireService} from "../../services/fire.service";


@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss']
})
export class AdminManageUsersComponent {

  filteredUsers: Observable<User[]> | undefined
  Users: User[] = []
  searchText: string ="";
  start: number =0;
  end: number = 30;
  formControl= new FormControl('');


  constructor( public fireService : FireService) {
    this.getUsers()
    console.log(this.Users)

    // @ts-ignore
    this.filteredUsers = this.formControl.valueChanges.pipe(startWith(null),
      map((value: string | null) =>
        (value? this._filter(value) : this.Users.slice())),)

  }

  getUsers()
  {
    this.Users = this.fireService.users
  }

  extendBook(u:User, b:BorrowedBook) {
    console.log(b.dueDate)
    b.dueDate.setDate(b.dueDate.getDate()+14);
     var replaceindex = u.books?.findIndex( element => element = b)
    // @ts-ignore
    u.books[replaceindex] = b;

    if (b.dueDate > new Date())
    {
      b.overDue= false;
    }

    this.fireService.updateBorrowedBookOnUser(u)
    console.log(b.dueDate)

  }

  sendMail(u: User, b: BorrowedBook) {

  }

  MoveForward() {

    this.start +=30;
    this.end +=30;
  }

  MoveBack() {
    this.start -=30;
    this.end -=30;
  }

   _filter(value: string):User[] {
     var searchText = value.toLowerCase();


     return this.Users.filter(it => {
       return it.name.toLocaleLowerCase().includes(searchText) || it.email.toLocaleLowerCase().includes(searchText)
     });
   }

  deleteUser(u: User) {
    this.Users = this.Users.filter( user => {
      return user.id!= u.id
    })
    // @ts-ignore
    this.filteredUsers = this.formControl.valueChanges.pipe(startWith(null),
        map((value: string | null) =>
          (value? this._filter(value) : this.Users.slice())),)

    this.fireService.deleteUser(u);
  }

  deliverBook(u: User, b: BorrowedBook) {
    u.books = u.books?.filter( book => {
      return b != book
    } )
    this.fireService.updateBorrowedBookOnUser(u);


  }
}
