export type User = {
  id?: string,
  name: string,
  email: string,
  imageUrl: string,
  admin: boolean,
  joinDate: Date,
  books?: BorrowedBook[]
}

export type Author = {
  id?: string,
  name: string,
}

export type BorrowedBook={
  book: Book,
  leaseDate: Date,
  dueDate: Date,
  overDue: boolean

}

export type Book = {
  id?: string,
  title: string,
  description: string,
  availability: boolean,
  authors: Author[],
  releaseYear: Date,
  imageUrl?: string,
  publisher: string,
  ISBN: number,
  edition: number,
  numberOfPages: number,
  language?: string[],
  tags?: string[],
  lix?: number,
  literaryType: string,
}
