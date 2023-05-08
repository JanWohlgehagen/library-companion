import { Component } from '@angular/core';
import {FireService} from "../services/fire.service";
import {User} from "../Types/types";
import {MockDataService} from "../mock_data/mock-data.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user: User | null = null;

  constructor(public firebaseservice: FireService, private mock: MockDataService, private router: Router) {
    this.user = this.mock.get_users(1)[0];
  }

  navigateToProfile() {
    this.router.navigate(["user-dashboard/settings"])

  }

  navigateToMyBooks() {
    this.router.navigate(["user-dashboard/settings"])

  }

  navigateToSignIn() {
    this.router.navigate(["login-and-registration"])

  }

  navigateToRegister() {
    this.router.navigate(["login-and-registration"])

  }

  navigateToMyCart() {
    this.router.navigate(["user-dashboard/checkout"])
  }
}
