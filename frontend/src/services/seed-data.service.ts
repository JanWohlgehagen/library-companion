import {Injectable} from '@angular/core';
import {Book, BorrowedBook, User} from "../Types/types";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

import * as config from '../../firebaseconfig.js';
import {delay} from "rxjs";
import {FireService} from "./fire.service";
import {MockDataService} from "../mock_data/mock-data.service";

@Injectable({
  providedIn: 'root'
})
export class SeedDataService {

  auth: firebase.auth.Auth;
  firestore: firebase.firestore.Firestore;
  storage: firebase.storage.Storage;

  constructor(public firebase: FireService, private mock: MockDataService) {
    this.auth= this.firebase.auth;
    this.firestore = this.firebase.firestore;
    this.storage = this.firebase.storage;

  }



  async seedDataToAuth() {
    let book = this.mock.get_books(1)[0];
    let b : BorrowedBook = {
      book:book,
      overDue:false,
      dueDate: new Date(),
      leaseDate: new Date()
    }
    let authUser: User[] = [
      {admin: false, books: [b], email: "Tobias@gmail.com", imageUrl: "", joinDate: new Date(), name: "Tobias Rasmussen"},
      {admin: false, books: [b], email: "Jan@gmail.com", imageUrl: "", joinDate: new Date(), name: "Jan Wohlgehagen"},
      {admin: false, books: [b], email: "Mikkel@gmail.com", imageUrl: "", joinDate: new Date(), name: "Mikkel Theut Meier"},
      {admin: false, books: [b], email: "Simon@gmail.com", imageUrl: "", joinDate: new Date(), name: "Simon Tved Nielsen"},
      {admin: false, books: [], email: "Simon@gil.com", imageUrl: "", joinDate: new Date(), name: "Simon Tved Nielsen"}
    ]

    const batch = this.firestore.batch()
    for (let i = 0; i < authUser.length; i++) {
      console.log(i)
     await this.auth.createUserWithEmailAndPassword(authUser[i].email, "1234567").then(result => {
        if (result.user) {
          result.user.updateProfile({
            displayName: authUser[i].name
          }).then(async () => {
            console.log(result.user)
            batch.set(this.firestore.collection("User").doc(result.user?.uid), authUser[i])
          })
        } else return
      })
    }

    await batch.commit()

  }
  seedDataBooks(){
    const tags = [
      'penis',
      'large',
      'men',
      'genital',
      'satire',
      'modern book',
      'fiction',
      'classics',
      'sci-fi',
      'fantasy',
      'mystery',
      'thriller',
      'England',
      'Washington',
      'First guy on the moon',
      'Dog house'
    ];
    const literary_type = [
      'non-fiction',
      'fiction'
    ];

    const publishers = [
      'Harper Collins',
      'Simon & Schuster',
      'Macmillan',
      'Hachette',
      'Penguin Random House'
    ];

    const languages = [
      'Danish',
      'English',
      'English',
      'English',
      'English',
      'French',
      'German',
      'Bulgarian',
      'Latin'
    ];

    const titles = [
      'How to live with a HUGE PENIS',
      'The Quick Brown Fox Jumps Over the Lazy Dog',
      'A Tale of Two Cities',
      'The Hitchhiker\'s Guide to the Galaxy',
      'Pride and Prejudice',
      'To Kill a Mockingbird',
      '1984',
      'The Great Gatsby',
      'The Catcher in the Rye',
      'Harry Potter and the Philosopher\'s Stone',
    ];

    type description = {
      description: string,
    }

    const description: description[] = [
      {description: "The quiet life of a man is going the complete opposite way as a childhood friend enters his life." +
          "The childhood friend claims the man is a host to an alien being, one who is still benign right now, but could take over the brain when it has grown to maturity. Fortunately there's a way to get rid of it and potentially unlock the key to get rid of all these aliens. " +
          "Distrusful of both this situation and of this childhood friend, the man hesitantly agrees to the proposal, it might be a mistake, but both options could've been the mistake, one had to be chosen." +
          "But what if this childhood friend is trying be misleading. Or what if this proposal is wrong or missing important details. How could an ordinary man come out of this situation in a better way. Time will tell."},

      {description: "The stable life of a young guy will be permanently altered as a new friend enters his life." +
          "The new friend claims the young guy is chosen to be trained in the prestigious way of an ancient martial arts, which has been used to defend the nation for centuries. Two hours are given to decide whether to accept or decline this incredible offer. " +
          "Distrusful of both this situation and of this new friend, the young guy cautiously agrees to the proposal, there must be truth to all this and if so, this was the right choice to make." +
          "But what if this new friend can't be trusted. Or what if this proposal is wrong or missing important details. How could an ordinary young guy be helpful at all in this situation. Time will tell."},

      {description: "The relaxed life of a young girl take a sharp turn as a stranger enters her life." +
          "The stranger claims the young girl was a witness of a horrific crime, a crime for which an innocent person is in jail for. Due to the horrific nature of the crime the memory was likely blocked, but there's a way to unblock it and save an innocent life. " +
          "Unconvinced of the situation, but trusting of this stranger, the young girl tentatively agrees to the proposal, if only to satisfy the nagging feeling of curiosity." +
          "But what if this stranger is trying to manipulate the situation. Or what if there's a change of mind. How could an ordinary young girl be this important to the situation. Only one way to find out."},

      {description: "The calm life of a girl might be changing forever as a strange boy enters her life." +
          "The strange boy claims the girl plays a vital role in the future, but that this version of the future cannot be allowed to be. The only way to prevent it is by traveling in time with this supposed time traveler. " +
          "Skeptical of this situation and of this strange boy, the girl hastily agrees to the proposal, there must be truth to all this and if so, this was the right choice to make." +
          "But what if this strange boy is just a crazy person. Or what if everything told is completely true. How could an ordinary girl find out what's happening without help. Either way, the choice has been made."}

    ]

    const authors = [
      { name: 'H. C. Andersen', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Stephen Kind', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Charles Dickens', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Ernest Hemingway', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'George Orwell', id: Math.floor(Math.random() * 1000000).toString()},
      { name:'Virginia Woolf', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Lev Tolstoj', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Mark Twain', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Francis Scott Fitzgerald', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'James Joyce', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Jane Austen', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Kurt Vonnegut', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Agatha Christie', id: Math.floor(Math.random() * 1000000).toString()},
      { name: 'Fjodor Dostojevskij', id: Math.floor(Math.random() * 1000000).toString()},
    ];

    for (let i = 0; i < 200; i++) {
      let book: Book = {
        ISBN: Math.floor(Math.random() * 10000000000000),
        authors: [authors[Math.floor(Math.random() * authors.length)]],
        availability: Math.random()<0.5,
        description: description[Math.floor(Math.random() * description.length)].description,
        edition: Math.floor(Math.random() * 10) + 1,
        id: Math.floor(Math.random() * 1000000).toString(),
        imageUrl: 'https://images-eu.bookshop.org/images/9781594743061.jpg?height=500&v=v4-c2fea925da6180c3472476dd74ebb988',
        language: [languages[Math.floor(Math.random() * languages.length)]],
        literaryType: literary_type[Math.floor(Math.random() * literary_type.length)],
        lix: Math.floor(Math.random() * 100),
        numberOfPages: Math.floor(Math.random() * 500) + 50,
        publisher: publishers[Math.floor(Math.random() * publishers.length)],
        releaseYear: new Date(
          2000 + Math.floor(Math.random() * 22),
          Math.floor(Math.random() * 12),
          Math.floor(Math.random() * 28) + 1
        ),
        tags: [
          tags[Math.floor(Math.random() * tags.length)],
          tags[Math.floor(Math.random() * tags.length)],
          tags[Math.floor(Math.random() * tags.length)],
          tags[Math.floor(Math.random() * tags.length)],
        ],
        title: titles[Math.floor(Math.random() * titles.length)]

      }
      this.firestore.collection("Book").doc(book.id).set({book})
    }
  }



}

