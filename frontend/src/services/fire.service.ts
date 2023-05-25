import {Injectable} from '@angular/core';
import firebase from 'firebase/compat/app';
import axios from "axios";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import {environment} from "../environments/environment";

import * as config from '../../firebaseconfig.js';
import {Book, BorrowedBook, User} from "../Types/types";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Injectable({
  providedIn: 'root'
})
export class FireService {
  firebaseApplication;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;
  books: Book[] = []
  cachedBooks: Book[] = []
  book: Book
  shoppingCart: Book[] = []
  shoppingCartCache: Book[] = []
  users: User[] = []
  loggedInUser: User | any


  baseAxiosURL: string = `${environment.api_baseURL}`

  constructor(private router: Router, private matSnackbar: MatSnackBar) {
    this.firebaseApplication = firebase.initializeApp(config.firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();

    if (environment.developmentMode) {
      this.useEmulators()
    }

    this.book = this.books[0]
    this.getUsers()
    this.getBooks()
    this.cachedBooks = this.books

    if (!this.auth.currentUser) {
      this.loggedInUser = undefined
      this.auth.signOut()
    }


    this.auth.onAuthStateChanged((user) => {
      if (user) {
        this.intercept();
      }
    })
  }

  useEmulators() {
    this.firestore.useEmulator('localhost', 8081);
    this.auth.useEmulator('http://localhost:9099');
    this.storage.useEmulator('localhost', 9199);
  }

  async getUsers() {
    await this.firestore.collection("User").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(changes => {
        let user = this.convertJsonToUser(changes.doc.id, changes.doc.data())
        if (changes.type == "added") {
          this.users.push(user);
        }
        if (changes.type == "modified") {
          const index = this.users.findIndex(document => document.id == changes.doc.id);
          this.users[index] = user
        }
        if (changes.type == "removed") {
          this.users = this.users.filter(ussr => ussr.id != user.id);
        }
        if (changes.doc.id == this.auth.currentUser?.uid) {
        }
      })
    })
  }

  async getBooks() {
    await this.firestore.collection("Book").onSnapshot(snapshot => {

      snapshot.docChanges().forEach(change => {
        let book = this.convertJsonToBook(change.doc.id, change.doc.data())
        if (change.type == "added") {
          this.books.push(book);
        }
        if (change.type == "modified") {
          const index = this.books.findIndex(document => document.id == change.doc.id);
          this.books[index] = book
        }
        if (change.type == "removed") {
          this.books = this.books.filter(ussr => ussr.id != book.id);
        }
      })
    })
  }

  setUser() {
    this.firestore.collection("User").doc(this.auth.currentUser?.uid).get().then(async (result) => {
        this.loggedInUser = this.convertJsonToUser(result.id, result.data())
      }
    )
  }

  intercept() {
    axios.interceptors
      .request
      .use(async (request) => {
        request.headers.Authorization = await this.auth.currentUser?.getIdToken() + ""
        return request;
      });
  }

  async register(name: string, email: string, password: string) {
    firebase.storage().ref('avatars').child('AvatarProfile.jpg').getDownloadURL().then(async img => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then(result => {
          if (result.user) {
            return result.user.updateProfile({
              displayName: name
            }).then(() => {
              let user: User = {
                admin: false,
                email: email,
                books: [],
                id: result.user?.uid,
                imageUrl: img,
                joinDate: new Date(),
                name: name
              }
              this.firestore.collection("User").doc(result.user?.uid).set(
                user)
              this.setUser()
              this.router.navigate(["/user-dashboard/browse-books"])
            })
          } else return
        }).catch((error) => {
        this.matSnackbar.open(error, 'close', {duration: 3000});
      })
    })
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password).then(value => {
      this.setUser()
      this.router.navigate(["/user-dashboard/browse-books"])
    })
      .catch((error) => {
        this.matSnackbar.open("The login is invalid", 'close', {duration: 4000});
      });
  }

  async updateUserAvatar(img) {
    axios.put(this.baseAxiosURL + 'Avatar', img, {
      headers: {
        'Content-Type': img.type,
        userid: this.auth.currentUser?.uid
      }
    }).then(async success => {
      await this.delay(3500) // to let the storage cloud catch up
      const storage = firebase.storage();
      storage.ref('avatars/' + this.auth.currentUser?.uid + '.jpg').getDownloadURL().then((url) => {
        this.loggedInUser.imageUrl = url
        this.firestore.collection("User").doc(this.auth.currentUser?.uid).update({
          imageUrl: url
        })
      }).catch(error => {
        console.log(error)
      });
    }).catch(err => {
      console.log(err)
    })
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateUserEmail(new_email: string) {
    axios.put(this.baseAxiosURL + 'Email', {email: new_email, userid: this.auth.currentUser?.uid})
      .then(success => {
        this.loggedInUser.email = new_email
      }).catch(err => {
      console.log(err)
    })
  }

  async createBook(book) {
    return (axios.post<string>(this.baseAxiosURL + "createBook", book, {}))
  }

  deleteBook(bookId) {
    axios.delete(this.baseAxiosURL + "deleteBook/" + bookId, {}
    ).then(() => {
    }).catch((error) => {
      console.log(error)
    })
  }

  async updateBook(book) {
    await axios.put(this.baseAxiosURL + "updateBook", {book: book})
      .then(() => {
      }).catch((error) => {
        console.log(error)
      })
  }


  async update_password(new_password: string) {
    if (this.auth.currentUser)
      await this.auth.currentUser.updatePassword(new_password);
  }

  async update_email(new_email) {
    if (this.auth.currentUser)
      await this.auth.currentUser.updateEmail(new_email)
  }

  async sign_out() {
    await this.auth.signOut()
    this.loggedInUser = undefined;
    this.router.navigate(["/login"])
    this.shoppingCart = []
    this.shoppingCartCache = []
  }

  private convertJsonToUser(id, data): User {
    let books: Book[] = data["books"]
    let borrowedBooks: BorrowedBook[] = []
    books.forEach(b => {
      let book = this.convertJsonToBook(b["book"]["id"], b)
      let dueDateTimeStamp;
      if (b["dueDate"]["seconds"]) {
        dueDateTimeStamp = new Date(new firebase.firestore.Timestamp(b["dueDate"]["seconds"], b["dueDate"]["nanoseconds"]).toDate().toString())
      } else {
        dueDateTimeStamp = new Date(b["dueDate"])
      }

      let leaseDateTimeStamp: Date;
      if (b["leaseDate"]["seconds"]) {
        leaseDateTimeStamp = new Date(new firebase.firestore.Timestamp(b["leaseDate"]["seconds"], b["leaseDate"]["nanoseconds"]).toDate().toString())
      } else {
        leaseDateTimeStamp = new Date(b["leaseDate"])
      }
      var overdue = false
      if (dueDateTimeStamp < new Date()) {
        overdue = true;
      }

      let Borrowedbook: BorrowedBook = {
        book: book,
        leaseDate: new Date(leaseDateTimeStamp),
        dueDate: new Date(dueDateTimeStamp),
        overDue: overdue
      }
      borrowedBooks.push(Borrowedbook)
    })


    let user: User = {
      id: id,
      name: data["name"],
      admin: data["admin"],
      imageUrl: data["imageUrl"],
      joinDate: data["joinDate"],
      email: data["email"],
      books: borrowedBooks
    }
    return user
  }

  private convertJsonToBook(id, data): Book {
    let timestamp;
    if (data["book"]["releaseYear"]["seconds"]) {
      timestamp = new Date(new firebase.firestore.Timestamp(
        data["book"]["releaseYear"]["seconds"],
        data["book"]["releaseYear"]["nanoseconds"]).toDate().toString()
      )

    } else {
      timestamp = new Date(data["book"]["releaseYear"].toString())
    }

    let book: Book = {
      id: id,
      lix: data["book"]["lix"],
      title: data["book"]["title"],
      availability: data["book"]["availability"],
      tags: data["book"]["tags"],
      imageUrl: data["book"]["imageUrl"],
      description: data["book"]["description"],
      edition: data["book"]["edition"],
      releaseYear: timestamp,
      literaryType: data["book"]["literaryType"],
      ISBN: data["book"]["ISBN"],
      language: data["book"]["language"],
      numberOfPages: data["book"]["numberOfPages"],
      authors: data["book"]["authors"],
      publisher: data["book"]["publisher"]
    }
    return book;
  }

  updateBorrowedBookOnUser(u: User) {
    let userId = u.id
    let borrowedBooks = u.books
    axios.put(this.baseAxiosURL + "updateBorrowedBooks", {userId: userId, borrowedBooks: borrowedBooks})
  }

  deleteUser(u: User) {
    let userId = u.id
    axios.delete(this.baseAxiosURL + "deleteUser", {data: {userId: userId}})
  }

  sendMail(u: User, b: BorrowedBook) {
    axios.post(this.baseAxiosURL + "sendMail", {user: u, borrowedBook: b})
  }

  async updateBookImage(img) {
    axios.put(this.baseAxiosURL + 'bookImage', img, {
      headers: {
        'Content-Type': img.type,
        bookid: this.book.id
      }
    }).then(async success => {
      await this.delay(3500) // to let the storage cloud catch up
      const storage = firebase.storage();
      storage.ref('bookImages/' + this.book.id + '.jpg').getDownloadURL().then((url) => {
        this.book.imageUrl = url
      });
    }).catch(err => {
      console.log(err)
    })
  }
}
