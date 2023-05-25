import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AdminManageBooksComponent} from "./admin-manage-books/admin-manage-books.component";
import {AdminManageUsersComponent} from "./admin-manage-users/admin-manage-users.component";
import {UserBrowseBooksComponent} from "./user-browse-books/user-browse-books.component";
import {UserCheckoutComponent} from "./user-checkout/user-checkout.component";
import {UserSettingsComponent} from "./user-settings/user-settings.component";
import {BookInfoComponent} from "./book-info/book-info.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AboutUsComponent} from "./about-us/about-us.component";
import {ResetPasswordComponent} from "./reset-password/reset-password.component";
import {LoginGuard} from "../services/Authguard/login-guard";
import {AdminGuard} from "../services/Authguard/admin-guard";

const routes: Routes = [
  {path: '', component: UserBrowseBooksComponent, title: 'Browse Books'},
    {path: 'login',
      children:[
        {path: '', component: LoginComponent, title: 'Login'},
        {path: 'register', component: RegistrationComponent, title: 'Register'},
        {path: 'reset', component: ResetPasswordComponent, title: 'Reset',  canActivate: [LoginGuard()]},
      ]},

    {path: 'admin-dashboard',
      children:[
        {path: 'manage-books', component: AdminManageBooksComponent, title: 'Manage Books', canActivate:[AdminGuard()]},
        {path: 'manage-users', component: AdminManageUsersComponent, title: 'Manage Users', canActivate:[AdminGuard()]},
      ]},

    {path: 'user-dashboard',
      children:[
        {path: 'checkout',  component: UserCheckoutComponent, title: 'Checkout', canActivate: [LoginGuard()]},
        {path: 'settings', component: UserSettingsComponent, title: 'Settings', canActivate: [LoginGuard()]},
        {path: 'browse-books',
          children:[
            {path: '', component: UserBrowseBooksComponent, title: 'Browse Books'},
            {path: 'book-info', component: BookInfoComponent, title: 'Book-info'}
          ]},
      ]},
    {path: 'about-us', component: AboutUsComponent, title: 'About-us'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
