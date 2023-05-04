import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MockDataService} from "../../mock_data/mock-data.service";
import {Author, Book} from "../../Types/types";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';

@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.scss']
})

export class AdminManageBooksComponent implements OnInit {
  control = new FormControl('');
  filtered: Observable<Book[]> | undefined;
  books: Book[] = []
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  inputEmptyError: string = "";
  authors: Author[] = [];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTag(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editTag(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeTag(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }

  }

  addAuthor(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push({name: value});
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeAuthor(tag: Tag): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  editAuthor(tag: Tag, event: MatChipEditedEvent) {
    const value = event.value.trim();

    // Remove fruit if it no longer has a name
    if (!value) {
      this.removeAuthor(tag);
      return;
    }

    // Edit existing fruit
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }

  }

  constructor(private mock: MockDataService) {
    this.books = this.mock.get_books(50)

  }

  ngOnInit() {
    this.filtered = this.control.valueChanges.pipe(
      startWith(null),
      map(
        (book : string | null) => (book? this._filter(book) : this.books.slice())),);
  }


  private _filter(name: string): Book[]  {
    var search = name.toLowerCase()
    return this.books.filter(f => f.title.toLowerCase().includes(search) ||
     f.ISBN.toString().includes(name) || this.checkAuthourName(search, f)
    );
  }

  checkAuthourName(name: string, book: Book) : boolean {
    let found : boolean = false;
    book.authors.forEach(a => {
      if (a.name.toLowerCase().includes(name)) {
        found = true;
      }
    })
    return found
  }

  displayTitle(book: Book): string {
    return book && book.title ? book.title : '';
  }

  getErrorMessage() {
      return 'You must enter a value';
  }



}

export interface Tag {
  name: string;
}
