import { NgModule } from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {LoginAndRegistrationComponent} from "./login-and-registration/login-and-registration.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminManageBooksComponent} from "./admin-manage-books/admin-manage-books.component";
import {AdminManageUsersComponent} from "./admin-manage-users/admin-manage-users.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";
import {UserBrowseBooksComponent} from "./user-browse-books/user-browse-books.component";
import {UserCheckoutComponent} from "./user-checkout/user-checkout.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";

const routes: Routes = [
  {path: 'login-and-registration', component: LoginAndRegistrationComponent, title: 'Login or register'},
  {path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard'},
  {path: 'admin-dashboard/manage-books', component: AdminManageBooksComponent, title: 'Manage Books'},
  {path: 'admin-dashboard/manage-users', component: AdminManageUsersComponent, title: 'Manage Users'},
  {path: 'user-dashboard', component: UserDashboardComponent, title: 'Dashboard'},
  {path: 'user-dashboard/browse-books', component: UserBrowseBooksComponent, title: 'Browse Books'},
  {path: 'user-dashboard/checkout', component: UserCheckoutComponent, title: 'Checkout'},
  {path: 'user-dashboard/settings', component: UserSettingsComponent, title: 'Settings'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
