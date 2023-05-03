import {Component, OnInit} from '@angular/core';
import {FireService} from "../../services/fire.service";
import {MockDataService} from "../../mock_data/mock-data.service";
import {Book} from "../../Types/types";

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.scss']
})
export class BookInfoComponent implements OnInit{

  books: Book[] = []
  panelOpenState = false;


  constructor(public firebaseservice: FireService, private mockDataBook: MockDataService) {

  }

  ngOnInit(): void {
    this.books = this.mockDataBook.get_books(1)
  }

  showDescription(){
    this.panelOpenState = !this.panelOpenState;
  }

}
