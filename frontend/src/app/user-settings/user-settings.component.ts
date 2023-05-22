import {Component, OnInit} from '@angular/core';
import {BorrowedBook, User} from "../../Types/types";
import {FireService} from "../../services/fire.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit{
  public user: User | any;
  public edit_email: boolean = false;
  public edit_password: boolean = false;
  public new_email: string = '';
  public new_password: string = '';
  public password_placeholder: string = '* * * * * * * * * * * *';

  constructor(public fireservice: FireService, private snack: MatSnackBar) {
   }

  async edit_email_function(new_email: string){
    console.log(this.new_email.valueOf())
    await this.fireservice.update_email(this.new_email).then(() =>{
      this.fireservice.updateUserEmail(new_email);
      this.snack.open("password successfully updated.", "Close", {duration:3000})
    }).catch(() => {
      this.snack.open("Could not update password, try again.", "Close", {duration:3000})
    })
    this.flip_email_state()
  }

  flip_email_state() {
    this.edit_email = !this.edit_email
  }

  updateUserAvatar($event) {
    const img = $event.target.files[0];
    this.fireservice.updateUserAvatar(img)
  }

  ngOnInit(): void {
    this.user = this.fireservice.loggedInUser;
    this.user?.books?.sort((book_a, book_b) => (book_a.overDue < book_b.overDue) ? 1 : -1)
    console.log(this.user.books)
  }
}
