import { Component} from '@angular/core';
import {MockDataService} from "../../mock_data/mock-data.service";
import {BorrowedBook, User} from "../../Types/types"
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs"


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


  constructor(private mock: MockDataService) {
    this.getUsers()
    this.getUserBooks()
    console.log(this.Users)

    // @ts-ignore
    this.filteredUsers = this.formControl.valueChanges.pipe(startWith(null),
      map((value: string | null) =>
        (value? this._filter(value) : this.Users.slice())),)

  }

  getUsers()
  {
    var usermock = this.mock.get_users(250);
    usermock.forEach(user => {
      if (user.admin == false)
      this.Users.push(user)
    })
  }

  getUserBooks()
  {
    this.Users.forEach(user=>{

      user.books = []
      let books= this.mock.get_books(Math.random()*5)
      books.forEach( b => {
        var number = Math.random();
        var overdue = false
        var daterandom = (Math.random()*25)+6
        var datelate= daterandom
        var date = new Date()
        if (number<0.25){
          datelate= -6;
          overdue = true;
        }

        let bb :BorrowedBook = {
          book: b,
          leaseDate: new Date(date.setDate(date.getDate()-(-daterandom))),
          dueDate: new Date(date.setDate(date.getDate()+ datelate)),
          overDue: overdue
        }
        user.books?.push(bb);

      })
    })
  }

  extendBook(u:User, b:BorrowedBook) {
    console.log(b.dueDate)
    b.dueDate.setDate(b.dueDate.getDate()+14);
    if (b.dueDate > new Date())
    {
      b.overDue= false;
    }
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
  }
}
