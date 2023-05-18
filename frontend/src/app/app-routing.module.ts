import { NgModule } from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {LoginAndRegistrationComponent} from "./login-and-registration/login-and-registration.component";
import {AdminManageBooksComponent} from "./admin-manage-books/admin-manage-books.component";
import {AdminManageUsersComponent} from "./admin-manage-users/admin-manage-users.component";
import {UserBrowseBooksComponent} from "./user-browse-books/user-browse-books.component";
import {UserCheckoutComponent} from "./user-checkout/user-checkout.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {BookInfoComponent} from "./book-info/book-info.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthguardService} from "../services/authguard.service";
import {AuthguardAdminService} from "../services/authguard-admin.service";

const routes: Routes = [
  //{path: '', component: UserBrowseBooksComponent, title: 'Browse Books'},
  {path: 'login', component: LoginAndRegistrationComponent, title: 'Login'},
  {path: 'register', component: RegistrationComponent, title: 'Register'},
  {path: 'admin-dashboard/manage-books', component: AdminManageBooksComponent, title: 'Manage Books', canActivate:[AuthguardAdminService]},
  {path: 'admin-dashboard/manage-users', component: AdminManageUsersComponent, title: 'Manage Users', canActivate:[AuthguardAdminService]},
  {path: 'user-dashboard/browse-books', component: UserBrowseBooksComponent, title: 'Browse Books'},
  {path: 'user-dashboard/checkout', component: UserCheckoutComponent, title: 'Checkout', canActivate: [AuthguardService]},
  {path: 'user-dashboard/settings', component: UserSettingsComponent, title: 'Settings'},
  {path: 'book-info', component: BookInfoComponent, title: 'Book-info'},
  //{path: '**', component: UserBrowseBooksComponent, title: 'Browse Books'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
