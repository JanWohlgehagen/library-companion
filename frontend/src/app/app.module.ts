import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAndRegistrationComponent } from './login-and-registration/login-and-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { AdminManageBooksComponent } from './admin-manage-books/admin-manage-books.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserBrowseBooksComponent } from './user-browse-books/user-browse-books.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { BookComponent } from './book/book.component';
import {NgOptimizedImage} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    LoginAndRegistrationComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    AdminManageBooksComponent,
    AdminManageUsersComponent,
    UserSettingsComponent,
    UserBrowseBooksComponent,
    UserCheckoutComponent,
    BookComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
