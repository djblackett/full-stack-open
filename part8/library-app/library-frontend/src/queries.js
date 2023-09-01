import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    
    title
    published
    author {
      name
    }
    genres
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      
      name
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ALL_BOOKS_BY_GENRE = gql`
  query AllBooks($genre: String) {
    allBooks(genre: $genre) {
      id
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $author: String!
    $title: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author {
        name
      }
      title
      published
      genres
      id
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
