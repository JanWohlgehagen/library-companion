import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAndRegistrationComponent } from './login-and-registration/login-and-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import {
  AdminManageBooksComponent,
  AdminManageBooksDialogComponent
} from './admin-manage-books/admin-manage-books.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserBrowseBooksComponent } from './user-browse-books/user-browse-books.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import { BookComponent } from './book/book.component';
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIcon, MatIconModule} from "@angular/material/icon";
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

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
    BookComponent,
    AdminManageBooksDialogComponent
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
    MatGridListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatAutocompleteModule,
    CommonModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    MatNativeDateModule,
    MatListModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
