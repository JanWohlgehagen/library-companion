import {Component, Inject, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Author, Book} from "../../Types/types";
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import {DateAdapter} from '@angular/material/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {FireService} from "../../services/fire.service";
import firebase from "firebase/compat";
import firestore = firebase.firestore;


export interface Tag {
  name: string;
}


@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books.component.html',
  styleUrls: ['./admin-manage-books.component.scss'],
})

export class AdminManageBooksComponent implements OnInit {
  bookControl = new FormControl('');
  filteredBooks: Observable<Book[]> | undefined;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
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
  inputPicture?: string = ""
  inputTagText: string[] | any = [];
  book: Book | any; //empty book
  name: string | undefined;


  constructor(public fireService: FireService, private dateAdapter: DateAdapter<Date>, public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
    if (this.inputAuthorText.length == 0) {
      this.addAuthorBtn()
    }

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
    this.filterBooks()
  }


  private _filterSearch(name: string): Book[] {
    const search = name.toString().toLowerCase();
    return this.fireService.books.filter(f => f.title.toLowerCase().includes(search) ||
      f.ISBN.toString().includes(name) || this.checkAuthorName(search, f)
    );
  }

  checkAuthorName(name: string, book: Book): boolean {
    let found: boolean = false;
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

  makeEmptyBook(): Book {
    return {
      id: "",
      tags: [],
      lix: 0,
      authors: [],
      releaseYear: new Date,
      imageUrl: "",
      description: "",
      title: "new book",
      literaryType: "",
      language: [],
      ISBN: 0,
      numberOfPages: 0,
      edition: 1,
      publisher: "",
      availability: true
    };
  }

  loadBookDetails(book: Book) {
    this.book = book;
    this.inputTitleText = book.title

    this.inputAuthorText = []
    book.authors.forEach(a => {
      let author: Author = {
        name: a.name
      }
      this.inputAuthorText.push(author)
    })
    this.inputReleaseYear = book.releaseYear
    this.inputPublisherText = book.publisher
    this.inputISBNtext = book.ISBN
    this.inputEditionText = book.edition
    this.inputNumPagesText = book.numberOfPages
    this.inputLanguagesText = book.language
    this.inputLixText = book.lix
    this.inputLiteraryText = book.literaryType
    this.inputDescriptionText = book.description
    this.inputPicture = book.imageUrl

    this.tags = [];
    book.tags?.forEach(t => {
      let tag: Tag = {
        name: t
      }
      this.tags.push(tag)
    })

    if (this.inputAuthorText.length == 0) {
      this.addAuthorBtn()
    }
  }

  saveBookBtn(book: Book) {
    this.book = book;
    book.title = this.inputTitleText
    book.authors = this.inputAuthorText
    book.releaseYear = this.inputReleaseYear
    book.publisher = this.inputPublisherText
    book.ISBN = this.inputISBNtext
    book.edition = this.inputEditionText
    book.numberOfPages = this.inputNumPagesText
    book.language = this.inputLanguagesText
    book.lix = this.inputLixText
    book.literaryType = this.inputLiteraryText
    book.description = this.inputDescriptionText
    book.imageUrl = this.inputPicture
    book.tags = this.tags.map(t => t.name)
    book.id = this.book.id

    this.filterBooks()
    this.bookControl.setValue(book.title + ", ed. " + book.edition)
    this.displayTitle(book)
    this.loadBookDetails(book)

    this.fireService.updateBook(book)

    // possible check before showing message, and show error message if, if statement returns false.
    this._snackBar.open("Book has been saved", "X", {"duration": 8000})
  }

  filterBooks() {
    this.filteredBooks = this.bookControl.valueChanges.pipe(
      startWith(null),
      map(
        (book: string | null) => (book ? this._filterSearch(book) : this.fireService.books.slice())),);
  }

  clearBookDetails() {
    this.inputTitleText = "";
    this.inputReleaseYear = null
    this.inputAuthorText = [];
    this.inputPublisherText = "";
    this.inputISBNtext = null;
    this.inputEditionText = null;
    this.inputNumPagesText = null;
    this.inputLanguagesText = [];
    this.inputLixText = null;
    this.inputDescriptionText = "";
    this.inputLiteraryText = "";
    this.inputPicture = ""
    this.inputTagText = [];
  }

  addNewCopiedBook() {
    this.book = {
      ISBN: this.inputISBNtext,
      authors: this.inputAuthorText,
      availability: true,
      description: this.inputDescriptionText,
      edition: this.inputEditionText,
      imageUrl: this.inputPicture,
      language: this.inputLanguagesText,
      literaryType: this.inputLiteraryText,
      lix: this.inputLixText,
      numberOfPages: this.inputNumPagesText,
      publisher: this.inputPublisherText,
      releaseYear: this.inputReleaseYear,
      tags: this.tags.map(t => t.name),
      id: "",
      title: this.inputTitleText
    }
  }


  addNewBookBtn(): void {
    const dialogRef = this.dialog.open(AdminManageBooksDialogComponent, {
      data: {name: this.fireService.loggedInUser.name},
    });
    dialogRef.afterClosed().subscribe(async result => {
      if(result.cancel) {
        this.dialog.closeAll()
      }
      if (result.clearAll) {
        this.book = this.makeEmptyBook()
        this.clearBookDetails()
        await this.newBookButtonMethods()

        this._snackBar.open("You're working on a new book! - remember to Save", "X", {"duration": 8000})
        }
      if (result.copyBook) {
        this.addNewCopiedBook()
        await this.newBookButtonMethods()

        this._snackBar.open("Book copied! - Remember to Save", "X", {"duration": 8000})
      }
    });
  }

  async newBookButtonMethods() {
    const id = (await this.fireService.createBook(this.book)).data;
    this.fireService.books.push(this.book)

    this.book.id = id;
    this.filterBooks()
    this.loadBookDetails(this.book)
    this.bookControl.setValue(this.book.title + ", ed. " + this.book.edition)
  }

  deleteAuthorBtn(a: Author) {
    this.inputAuthorText = this.inputAuthorText.filter(author => {
      return author.name != a.name
    })
  }

  addAuthorBtn() {
    let author: Author = {
      name: "",
      id: ""
    }
    this.inputAuthorText.push(author)
  }

  deleteBookBtn() {
    if (confirm("Are you sure you want to delete this book?")) {
      this.fireService.deleteBook(this.book.id)
      this.filterBooks()
      this.bookControl.setValue(null)
      this.clearBookDetails()
      this.addAuthorBtn()
      this._snackBar.open("The book has been deleted", "X", {"duration": 8000})
    }
    else {

    }
  }

  updateBookImage($event) {
    const img = $event.target.files[0];
    this.fireService.updateBookImage(img)
  }


}

@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books-add-book-dialog.component.html',
})
export class AdminManageBooksDialogComponent {


  constructor(public fireService: FireService,
    public dialogRef: MatDialogRef<AdminManageBooksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FireService,
  ) {
    console.log(data.loggedInUser)
    console.log(fireService.loggedInUser)
  }

  cancelClick(): void {
    this.dialogRef.close({cancel: "cancel"});
  }

  newBookCopyBook() {
    this.dialogRef.close({copyBook: "copyBook"});
  }

  newBookClearAll() {
    this.dialogRef.close({clearAll: "clearAll"});
  }
}
