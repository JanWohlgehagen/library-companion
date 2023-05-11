import {Component, OnDestroy, OnInit} from '@angular/core';
import {MockDataService} from "../../mock_data/mock-data.service";
import {BorrowedBook, User} from "../../Types/types";
import {FireService} from "../../services/fire.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy{
  user: User | null = null;
  edit_email: boolean = false;
  edit_password: boolean = false;
  new_email: string = '';
  new_password: string = '';
  password_placeholder: string = '* * * * * * * * * * * *';

  constructor(private mock: MockDataService, public fireservice: FireService) {
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

  ngOnInit(): void {
    this.user = this.fireservice.loggedInUser;
    console.log(this.user)
    console.log(this.fireservice.loggedInUser)
    this.user?.books?.sort((book_a, book_b) => (book_a.overDue < book_b.overDue) ? 1 : -1)

  }

  ngOnDestroy(): void {
    console.log('destroyed')
  }
}
