import { Injectable } from '@angular/core';
import {Author, Book, User} from "../Types/types";
import firebase from "firebase/compat";
import auth = firebase.auth;

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  constructor() { }

  public get_books(amount: number): Book[] {
    const mockBooks = [];
    for (let i = 0; i < amount; i++) {
      // @ts-ignore
      mockBooks.push(generateMockBookData());
    }
    return mockBooks;
  }
  public get_authors(amount: number): Author[] {
    const mockAuthors = [];
    for (let i = 0; i < amount; i++) {
      // @ts-ignore
      mockAuthors.push(generateMockAuthorData());
    }
    return mockAuthors;
  }
  public get_users(amount: number): User[] {
    const mockAuthors = [];
    for (let i = 0; i < amount; i++) {
      // @ts-ignore
      mockAuthors.push(generateMockUserData());
    }
    return mockAuthors;
  }
}

function generateMockUserData() : User {
  const firstName = [
    'Alice',
    'Bob',
    'Charlie',
    'Dave',
    'Eve',
    'Frank',
    'Grace',
    'Heidi',
    'Ivan',
    'Julia',
  ];

  const lastName = [
    'West',
    'Zimmerman',
    'Chaplin',
    'Cook',
    'Nielson',
    'Chapman',
    'Banner',
    'Odinson',
    'Zuckerberg',
    'Extraction Point:Delta',
  ];
  const profile_urls = [
    'https://i.ebayimg.com/images/g/4-gAAOSwQPBiAC2r/s-l500.jpg',
    'https://i.etsystatic.com/7244022/r/il/169444/2230664078/il_570xN.2230664078_n34m.jpg',
    'https://i.etsystatic.com/31789015/r/il/4bf6d8/3459705562/il_fullxfull.3459705562_1co8.jpg'
  ];

  const first_name = firstName[Math.floor(Math.random() * firstName.length)];
  return {
    id: Math.floor(Math.random() * 1000000).toString(),
    name: first_name + ' ' + lastName[Math.floor(Math.random() * lastName.length)],
    email: `${first_name}@example.com`,
    imageUrl: profile_urls[Math.floor(Math.random() * profile_urls.length)],
    admin: Math.random() < 0.5, // 50% chance of being an admin
    joinDate: new Date(
      2010 + Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ),
  };
}

function generateMockAuthorData() : Author {
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

  return authors[Math.floor(Math.random() * authors.length)];
}

function generateMockBookData() : Book {
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

  const a_book: Book = {
    id: Math.floor(Math.random() * 1000000).toString(),
    title: titles[Math.floor(Math.random() * titles.length)],
    authors: [
      authors[Math.floor(Math.random() * authors.length)],
      authors[Math.floor(Math.random() * authors.length)],
    ],
    description: 'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      'This books is about how one might cope with having a huge penis.' +
      '',
    edition: Math.floor(Math.random() * 10) + 1,
    lix: Math.floor(Math.random() * 100),
    ISBN: Math.floor(Math.random() * 10000000000000),
    language: [languages[Math.floor(Math.random() * languages.length)]],
    tags: [
      tags[Math.floor(Math.random() * tags.length)],
      tags[Math.floor(Math.random() * tags.length)],
      tags[Math.floor(Math.random() * tags.length)],
      tags[Math.floor(Math.random() * tags.length)],
    ],
    literaryType: literary_type[Math.floor(Math.random() * literary_type.length)],
    numberOfPages: Math.floor(Math.random() * 500) + 50,
    publisher: publishers[Math.floor(Math.random() * publishers.length)],
    releaseYear: new Date(
      2000 + Math.floor(Math.random() * 22),
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    ),
    imageUrl: 'https://images-eu.bookshop.org/images/9781594743061.jpg?height=500&v=v4-c2fea925da6180c3472476dd74ebb988',
  };

  return a_book;
}
