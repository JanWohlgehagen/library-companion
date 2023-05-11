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

    this.firestore.useEmulator('localhost', 8080);
    this.auth.useEmulator('http://localhost:9099');
    this.storage.useEmulator('localhost', 9199);

    this.books = mock.get_books(100)
    this.book = this.books[0]
    this.users = mock.get_users(25)
    this.users.forEach(user=>{

      user.books = []
      let books= this.mock.get_books(Math.random()*5)
      books.forEach( b => {
        var number = Math.random();
        var overdue = false
        var daterandom = (Math.random()*25)+6
        var datelate= daterandom
        var date = new Date()
        if (number<0.25){
          datelate= -6;
          overdue = true;
        }

        let bb :BorrowedBook = {
          book: b,
          leaseDate: new Date(date.setDate(date.getDate()-(-daterandom))),
          dueDate: new Date(date.setDate(date.getDate()+ datelate)),
          overDue: overdue
        }
        user.books?.push(bb);

      })
    })

    this.auth.onAuthStateChanged( (user) =>{
      console.log("HEJ")
      if (user) {
        this.setUser()
        this.intercept();
         this.router.navigate(["/user-dashboard/browse-books"])
      }
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
          books: []
        }
      }
    )

  }

  intercept() {
    axios.interceptors
      .request
      .use(async (request) => {
        request.headers.Authorization = await this.auth.currentUser?.getIdToken() + ""
        console.log(request)
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
            // dette er kun for at test database - skal slette igen
            this.firestore.collection("User").doc(result.user?.uid).set(
              {user})


            //axios.post(this.baseAxiosURL+'CreateUser', user).then(success => {
             // console.log(success)
           // }).catch(err => {
             // console.log(err)
           // })
          })
        } else return
      }).catch((error) => {
      this.matSnackbar.open(error, 'close', {duration: 3000});
    })
  }

  async login(email: string, password: string) {
    console.log("HELLOO")
    await this.auth.signInWithEmailAndPassword(email, password)
      .catch((error) =>{
        this.matSnackbar.open("The login is invalid", 'close', {duration: 4000});
    });
    await this.setUser()
    this.router.navigate(["/user-dashboard/browse-books"])
    console.log(this.loggedInUser)

  }

  updateUserAvatar($event) {
    const img = $event.target.files[0];
    console.log(img)
  }

  async sign_out() {
    await this.auth.signOut()
  }
}
