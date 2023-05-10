import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MockDataService} from "../../mock_data/mock-data.service";
import {Author, Book} from "../../Types/types";
import {COMMA, D, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';

export interface Tag {
  name: string;
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  encapsulation: ViewEncapsulation.None,
})

export class AdminManageBooksComponent implements OnInit {
  bookControl = new FormControl('');
  filteredBooks: Observable<Book[]> | undefined;
  books: Book[] = []
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  authors: Author[] = [];
  authorCtrl = new FormControl('');
  filteredAuthors: Observable<Author[]> | undefined;
  selectedBook: Book | undefined;
  inputTitleText: string = "";
  inputReleaseYear: Date | any;
  inputAuthorText: Author[] = [];
  inputPublisherText: string = "";
  inputISBNtext: number | any;
  inputEditionText: number | any;
  inputNumPagesText: number | any;
  inputLanguagesText: string[] | any = [];
  inputLixText: number | any;
  inputDescriptionText: string = "";
  inputLiteraryText: string = "";
  inputPicture: any;
  inputTagText: string[] | any = [];
  inputs: Book | any;
  date = new FormControl(moment());


  constructor(private mock: MockDataService) {
    this.books = this.mock.get_books(50)

  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

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

    if (!value) {
      this.removeTag(tag);
      return;
    }

    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index].name = value;
    }

  }


  ngOnInit() {
    this.filteredBooks = this.bookControl.valueChanges.pipe(
      startWith(null),
      map(
        (book : string | null) => (book? this._filterSearch(book) : this.books.slice())),);
  }


  private _filterSearch(name: string): Book[]  {
    const search = name.toString().toLowerCase();
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


  removeAuthor(author: Author) {
    const index = this.authors.indexOf(author)

    if (index >= 0) {
      this.authors.splice(index, 1)
    }
  }

  addAuthor(event: MatChipInputEvent) {
    const value = (event.value || '').trim();

    if (value) {
      this.authors.push({name: value})
    }

    event.chipInput!.clear();
  }

  chooseBook($event) {
    console.log($event.value)
  }

  setValue(options: Book) {
    this.inputs = options
    this.inputTitleText = options.title


    /*this.inputAuthorText = options.authors*/

    /*this.authors = []
    options.authors.forEach(a => {
      let author: Author = {
        name: a.name
      }
      this.authors.push(author)
    })*/

    this.inputReleaseYear = options.releaseYear
    this.inputPublisherText = options.publisher
    this.inputISBNtext = options.ISBN
    this.inputEditionText = options.edition
    this.inputNumPagesText = options.numberOfPages
    this.inputLanguagesText = options.language
    this.inputLixText = options.lix
    this.inputLiteraryText = options.literaryType
    this.inputDescriptionText = options.description
    this.inputPicture = options.imageUrl
    this.tags = []
    options.tags?.forEach(t => {
      let tag: Tag = {
        name: t
      }
      this.tags.push(tag)
    })
  }

  saveBookBtn(inputs: Book) {
    inputs.title = this.inputTitleText

    // authors

    inputs.releaseYear = this.inputReleaseYear
    inputs.publisher = this.inputPublisherText
    inputs.ISBN = this.inputISBNtext
    inputs.edition = this.inputEditionText
    inputs.numberOfPages = this.inputNumPagesText
    inputs.language = this.inputLanguagesText
    inputs.lix = this.inputLixText
    inputs.literaryType = this.inputLiteraryText
    inputs.description = this.inputDescriptionText
    inputs.imageUrl = this.inputPicture
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<any>) {
    const ctrlValue = this.date.value!;
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }




}
