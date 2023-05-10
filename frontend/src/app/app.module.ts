import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginAndRegistrationComponent } from './login-and-registration/login-and-registration.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminManageBooksComponent } from './admin-manage-books/admin-manage-books.component';
import { AdminManageUsersComponent } from './admin-manage-users/admin-manage-users.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { UserBrowseBooksComponent } from './user-browse-books/user-browse-books.component';
import { UserCheckoutComponent } from './user-checkout/user-checkout.component';
import {NgOptimizedImage} from "@angular/common";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { BookInfoComponent } from './book-info/book-info.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatNativeDateModule, MatRippleModule} from "@angular/material/core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import { BrowseBooksPipe } from './pipes/browse-books.pipe';
import {MatDividerModule} from "@angular/material/divider";
import {MatStepperModule} from "@angular/material/stepper";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDatepickerModule} from "@angular/material/datepicker";



@NgModule({
  declarations: [
    AppComponent,
    LoginAndRegistrationComponent,
    AdminDashboardComponent,
    AdminManageBooksComponent,
    AdminManageUsersComponent,
    UserSettingsComponent,
    UserBrowseBooksComponent,
    UserCheckoutComponent,
    BookInfoComponent,
    BrowseBooksPipe
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
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDividerModule,
    MatStepperModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
