import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import axios from "axios";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import * as config from '../../firebaseconfig.js';
import {Book, User} from "../Types/types";

@Injectable({
  providedIn: 'root'
})
export class FireService {
  firebaseApplication;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  shoppingCart: Book[] = []


  baseAxiosURL: string = 'http://127.0.0.1:5001/library-companion-1049c/us-central1/api/'

  constructor() {
    this.firebaseApplication = firebase.initializeApp(config.firebaseConfig);
    this.auth = firebase.auth();
    this.firestore = firebase.firestore();
    this.storage = firebase.storage();

    this.firestore.useEmulator('localhost', 8080);
    this.auth.useEmulator('http://localhost:9099');
    this.storage.useEmulator('localhost', 9199);



    this.auth.onAuthStateChanged((user) =>{
      if (user) {
        this.intercept();
      }
    })
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
            axios.post(this.baseAxiosURL+'CreateUser', user).then(success => {
              console.log(success)
            }).catch(err => {
              console.log(err)
            })
          })
        } else return
      }).catch(function (error) {
        console.log(error)
    })
  }

  async login(email: string, password: string) {
    await this.auth.signInWithEmailAndPassword(email, password);
  }


  updateUserAvatar($event) {
    const img = $event.target.files[0];
    console.log(img)
  }

  async sign_out() {
    await this.auth.signOut();
  }
}
