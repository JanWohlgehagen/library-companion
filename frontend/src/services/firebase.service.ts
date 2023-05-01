import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import axios from "axios";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import * as config from '../../firebaseconfig.js';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  firebaseApplication;
  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;


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


}
