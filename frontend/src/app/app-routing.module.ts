import { NgModule } from '@angular/core';
import {ResolveFn, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminManageBooksComponent} from "./admin-manage-books/admin-manage-books.component";
import {AdminManageUsersComponent} from "./admin-manage-users/admin-manage-users.component";
import {UserBrowseBooksComponent} from "./user-browse-books/user-browse-books.component";
import {UserCheckoutComponent} from "./user-checkout/user-checkout.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {BookInfoComponent} from "./book-info/book-info.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthguardService} from "../services/Authguard/authguard.service";
import {AuthguardAdminService} from "../services/Authguard/authguard-admin.service";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";

const routes: Routes = [
  {path: '', component: UserBrowseBooksComponent, title: 'Browse Books'},
    {path: 'login',
      children:[
        {path: '', component: LoginComponent, title: 'Login'},
        {path: 'register', component: RegistrationComponent, title: 'Register'},
        {path: 'reset', component: ResetPasswordComponent, title: 'Reset',  canActivate: [AuthguardService]},
      ]},

    {path: 'admin-dashboard',
      children:[
        {path: 'manage-books', component: AdminManageBooksComponent, title: 'Manage Books', canActivate:[AuthguardAdminService]},
        {path: 'manage-users', component: AdminManageUsersComponent, title: 'Manage Users', canActivate:[AuthguardAdminService]},
      ]},

    {path: 'user-dashboard',
      children:[
        {path: 'checkout',  component: UserCheckoutComponent, title: 'Checkout', canActivate: [AuthguardService]},
        {path: 'settings', component: UserSettingsComponent, title: 'Settings'},
        {path: 'browse-books', component: UserBrowseBooksComponent, title: 'Browse Books',
          children:[
            {path: 'book-info', component: BookInfoComponent, title: 'Book-info'}
          ]},
      ]},
    {path: 'about-us', component: AboutUsComponent, title: 'About-us'},
    //{path: '**', component: UserBrowseBooksComponent, title: 'Browse Books'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
