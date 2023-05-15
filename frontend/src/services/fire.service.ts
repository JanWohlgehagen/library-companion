import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import axios from "axios";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import * as config from '../../firebaseconfig.js';
import {Book, BorrowedBook, User} from "../Types/types";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MockDataService} from "../mock_data/mock-data.service";
import * as string_decoder from "string_decoder";


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


  baseAxiosURL: string = 'http://127.0.0.1:5001/library-companion-1049c/us-central1/api/'

  constructor(private router: Router, private matSnackbar: MatSnackBar, private mock: MockDataService) {
    this.firebaseApplication = firebase.initializeApp(config.firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();

    this.firestore.useEmulator('localhost', 8081);
    this.auth.useEmulator('http://localhost:9099');
    this.storage.useEmulator('localhost', 9199);

    this.books = mock.get_books(100)
    this.book = this.books[0]
    this.getUsers()
    this.getBooks()
    this.auth.onAuthStateChanged( (user) =>{
      if (user) {
        this.setUser()
        this.intercept();
         this.router.navigate(["/user-dashboard/browse-books"])
      }
    })
  }

  async getUsers(){
    await this.firestore.collection("User").onSnapshot( snapshot => {
      snapshot.docChanges().forEach(changes => {
        let user = this.convertJsonToUser(changes.doc.id, changes.doc.data())
        if(changes.type=="added"){
          this.users.push(user);
        }
        if (changes.type=="modified"){
          const index = this.users.findIndex(document => document.id == changes.doc.id);
          this.users[index] = user
        }
        if (changes.type=="removed"){
          this.users = this.users.filter(ussr => ussr.id != user.id);
        }
      })
    })
  }
  async getBooks()
  {
    await this.firestore.collection("Book").onSnapshot( snapshot => {
      snapshot.docChanges().forEach( change => {
        let book = this.convertJsonToBook(change.doc.id, change.doc.data())
        if(change.type=="added"){
          this.books.push(book);
        }
        if (change.type=="modified"){
          const index = this.books.findIndex(document => document.id == change.doc.id);
          this.books[index] = book
        }
        if (change.type=="removed"){
          this.books = this.books.filter(ussr => ussr.id != book.id);
        }
      })
    })
  }
  async setUser()
  {
    await this.firestore.collection("User").doc(this.auth.currentUser?.uid).get().then( (result) =>
      {
        this.loggedInUser = {
          id: result.id,
          name: result.get("name"),
          email: result.get("email"),
          admin: result.get("admin"),
          joinDate: result.get("joinDate"),
          imageUrl: result.get("imageUrl"),
          books: result.get("books")
        }
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

//TODO - NOT FINISHED
  async register(name: string, email: string, password: string){
    this.auth.createUserWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user) {
          return result.user.updateProfile({
            displayName: name
          }).then(() => {
            let user : User = {
              admin: false,
              email: email,
              id: result.user?.uid,
              imageUrl: "",
              joinDate: new Date(),
              name: name
            }
            this.firestore.collection("User").doc(result.user?.uid).set(
              {user})
          })
        } else return
      }).catch((error) => {
      this.matSnackbar.open(error, 'close', {duration: 3000});
    })
  }

  async login(email: string, password: string) {
    console.log("HELLOO")
    await this.auth.signInWithEmailAndPassword(email, password).then(value => {
      this.setUser()
      this.router.navigate(["/user-dashboard/browse-books"])
    })
      .catch((error) =>{
        this.matSnackbar.open("The login is invalid", 'close', {duration: 4000});
    });




  }

  updateUserAvatar(img) {
    axios.put(this.baseAxiosURL+'Avatar', img, {
      headers: {
        'Content-Type': img.type,
        userid: this.auth.currentUser?.uid
      }
    }).then(success => {
      this.loggedInUser.imageUrl = success.data
    }).catch(err => {
      console.log(err)
    })
  }

  updateUserEmail(new_email: string) {
    axios.put(this.baseAxiosURL+'Email', {email: new_email, userid: this.auth.currentUser?.uid})
      .then(success => {
      this.loggedInUser.email = new_email
    }).catch(err => {
      console.log(err)
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
  }

  private convertJsonToUser(id, data) : User {
    let user : User = {
      id :id,
      name: data["name"],
      admin: data["admin"],
      imageUrl:data["admin"],
      joinDate: data["joinDate"],
      email: data["email"],
      books : data["books"]

    }
    return user
  }

  private convertJsonToBook(id: string, data: firebase.firestore.DocumentData): Book {
    let book: Book = {
      id:id,
      authors:data["author"],
      lix:data["lix"],
      title: data["title"],
      availability:data["availability"],
      tags: data["tags"],
      imageUrl:data["imageUrl"],
      description: data["description"],
      edition: data["edition"],
      releaseYear: data["releaseYear"],
      literaryType: data["literaryType"],
      ISBN:data["ISBN"],
      language:data["language"],
      numberOfPages: data["numberOfPages"],
      publisher:data["publisher"]

    }
    return book;

  }

}
