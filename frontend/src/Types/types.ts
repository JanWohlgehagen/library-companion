export type User = {
  id?: string,
  name: string,
  email: string,
  imageUrl: string,
  admin: boolean,
  joinDate: Date,
  books?: Book[]
}

export type Author = {
  id?: string,
  name: string,
}

export type Book = {
  id?: string,
  title: string,
  description: string,
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
