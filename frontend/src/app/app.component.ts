import { Component } from '@angular/core';
import {FireService} from "../services/fire.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public firebaseservice: FireService) {
  }
}
