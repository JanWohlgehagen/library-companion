import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MockDataService} from "../../mock_data/mock-data.service";
import {Book} from "../../Types/types";


@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.scss']
})

export class AdminManageBooksComponent implements OnInit {
  control = new FormControl('');
  filtered: Observable<Book[]> | undefined;
  books: Book[]

  constructor(private mock: MockDataService) {
    this.books = this.mock.get_books(10)

  }

  ngOnInit() {
    this.filtered = this.control.valueChanges.pipe(
      startWith(null),
      map(
        /*const name = typeof value === 'string' ? value : value?.title;*/
        /*return name ? this._filter(name as string) : this.options.slice();*/
        (book : string | null) => (book? this._filter(book) : this.books.slice())),);
  }


 /* display(title: Title): string {
    return title && title.title ? title.title : '';
  }*/


  private _filter(name: string): Book[] {
    const filterValue = name.toLowerCase();
    let filteredBooks = this.books.filter(option => {
      option.title.toLowerCase().includes(filterValue)
      console.log(filterValue + '= '+ option.title.toLowerCase())
  })
    return filteredBooks;
  }


}


/*
export interface Title {
  title: string;
}
*/
