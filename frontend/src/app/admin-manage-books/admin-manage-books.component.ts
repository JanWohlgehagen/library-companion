import {Component, OnInit, Inject} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MockDataService} from "../../mock_data/mock-data.service";
import {Author, Book} from "../../Types/types";
import {COMMA, D, ENTER} from '@angular/cdk/keycodes';
import {MatChipEditedEvent, MatChipInputEvent} from '@angular/material/chips';
import { DateAdapter } from '@angular/material/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


export interface Tag {
  name: string;
}

export interface DialogData {
  animal: string;
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
  books: Book[] = []
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: Tag[] = [];
  authors: Author[] = [];
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

  animal: string | undefined;
  name: string | undefined;


  constructor(private mock: MockDataService, private dateAdapter: DateAdapter<Date>, public dialog: MatDialog) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
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
        (book: string | null) => (book ? this._filterSearch(book) : this.books.slice())),);
  }


  private _filterSearch(name: string): Book[] {
    const search = name.toString().toLowerCase();
    return this.books.filter(f => f.title.toLowerCase().includes(search) ||
      f.ISBN.toString().includes(name) || this.checkAuthourName(search, f)
    );
  }

  checkAuthourName(name: string, book: Book): boolean {
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

  loadBookDetails(options: Book) {
    this.inputs = options
    this.inputTitleText = options.title

    this.inputAuthorText = []
    options.authors.forEach(a => {
      let author: Author = {
        name: a.name
      }
      console.log(author)
      this.inputAuthorText.push(author)
    })
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
    console.log(this.inputs)
  }

  saveBookBtn(inputs: Book) {
    inputs.title = this.inputTitleText
    inputs.authors = this.inputAuthorText
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
    inputs.tags = this.inputTagText

    console.log(this.inputAuthorText)
  }



  addNewBookBtn(): void {
    const dialogRef = this.dialog.open(AdminManageBooksDialogComponent, {
      data: {name: this.name, animal: this.animal},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.animal = result;
    });
  }



}



@Component({
  selector: 'app-admin-manage-books',
  templateUrl: './admin-manage-books-add-book-dialog.component.html',
})
export class AdminManageBooksDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AdminManageBooksDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  newBookCopyBook() {
    console.log("book has been copied console log")
    this.dialogRef.close();
  }

  newBookClearAll() {
    console.log("fields has been cleared console log")
    this.dialogRef.close();
  }
}
