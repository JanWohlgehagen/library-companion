import { Component } from '@angular/core';
import {MockDataService} from "../../mock_data/mock-data.service";
import {User} from "../../Types/types"

@Component({
  selector: 'app-admin-manage-users',
  templateUrl: './admin-manage-users.component.html',
  styleUrls: ['./admin-manage-users.component.scss']
})
export class AdminManageUsersComponent {

  Users: User[] = []


  constructor(private mock: MockDataService) {
    this.getUsers()
    this.getUserBooks()
    console.log(this.Users)
  }

  getUsers()
  {
    this.Users = this.mock.get_users(10);
  }

  getUserBooks()
  {
    this.Users.forEach(user=>{

      user.books = this.mock.get_books(Math.random()*3)
    })
  }

  extendBook() {

  }

  sendMail(u: User) {

  }
}
