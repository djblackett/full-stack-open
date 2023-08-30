const typeDefs = `

  type Book {
    title: String! 
    published: Int!
    author: Author!
    id: String!
    genres: [String!]!
  }

  type Author {
  name: String!
  id: String!
  born: Int
  bookCount: Int
 }
 
 type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}
 
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
  ): Book
 
  editAuthor(
    name: String! 
    setBornTo: Int! 
  ): Author
  
  createUser(
    username: String!
    favoriteGenre: String!
  ): User
  login(
    username: String!
    password: String!
  ): Token

}

 type Query {
   bookCount: Int!
   authorCount: Int!,
   author: Author!
   allBooks(author: String, genre: String): [Book]!
   allAuthors: [Author!]!
   me: User
 }
 
`;

module.exports = typeDefs;