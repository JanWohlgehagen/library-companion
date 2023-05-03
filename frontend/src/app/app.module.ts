import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {CommonModule} from '@angular/common';
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
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";

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
    NgOptimizedImage,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    CommonModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
