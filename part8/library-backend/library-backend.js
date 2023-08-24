require("dotenv").config();

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql/error");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/authorSchema");
const Book = require("./models/bookSchema");
const User = require("./models/userSchema");



const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to", MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });


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


const resolvers = {
  Query: {
    author: async (authorId) => Author.findById(authorId).exec(),
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (_, { author, genre }, context) => {

      // console.log(author);
      // console.log(genre);

      if (!author && !genre) {
        console.log("No params:");
        const booksNoParams = await Book.find({}).populate("author").exec();
        console.log(booksNoParams);
        return booksNoParams;
      } else if (!genre ) {
        console.log("Author no genre");
        const getAuthor = await Author.findOne({ name: author }).exec();
        const authorBooks = await Book.find({ author: getAuthor } ).populate("author").exec();
        console.log(authorBooks);
        return authorBooks;
      } else if (!author) {
        console.log("In the genre filter");
        const filteredByGenre = await Book.find({ genres: genre }).populate("author").exec();
        console.log(filteredByGenre);
        return filteredByGenre;
      }
      //todo finish this below
      const getAuthor = await Author.findOne({ name: author }).exec();
      return Book.find({ author: getAuthor , genres: genre }).populate("author").exec();
    },
    allAuthors: async () => {
      const authorsArr = await Author.find();
      console.log(authorsArr);

      const result = authorsArr.map(async author => {
        console.log(author);
        const authorBookCount = await Book.find({ author: author._id }).countDocuments();
        console.log("authorBookCount:", authorBookCount);
        return { ...author, bookCount: authorBookCount };
      });
      console.log(result);
      return authorsArr;
    },
    me: (root, args, context) => context.currentUser

  },
  Mutation: {
    addBook: async (root, args, context) => {

      if (!context.currentUser) {
        throw new GraphQLError("User must be logged in to add book");
      }

      if (args.title.length < 2) {
        throw new GraphQLError("Title must be longer than one character", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title
          }
        });
      }

      const book = await Book.findOne({ title: args.title });
      // console.log("After book definition");
      if (book) {
        // console.log("book exists");
        throw new GraphQLError("Name must be unique", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title
          }
        });
      }

      if (args.author.length < 3) {
        throw new GraphQLError("Authors name must be at least 3 characters", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.author
          }
        });
      }
      const author = await Author.findOne( { name: args.author });
      // console.log(author);

      try {
        if (!author) {
          const newAuthor = await new Author({ name: args.author });
          // console.log(newAuthor);
          const savedAuthor = await newAuthor.save();
          // console.log(savedAuthor);
          return new Book({ ...args, author: savedAuthor }).save();
        }
        return new Book({ ...args, author: author }).save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error
          }
        });
      }
    }
    ,
    editAuthor: async (root, args, context) => {

      if (!context.currentUser) {
        throw new GraphQLError("User must be logged in to edit author info");
      }
      // console.log(args);
      if (args.setBornTo < 0 || args.setBornTo > 2030) {
        throw new GraphQLError("setBornTo must be less than the current year", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo
          }
        });
      }
      try {
        const author = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true });
        // console.log(author);
        return author;
      } catch (error) {
        throw new GraphQLError("Updating author failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error
          }
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre });

      return user.save()
        .catch(error => {
          throw new GraphQLError("Creating the user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.name,
              error
            }
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if ( !user || args.password !== "secret" ) {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT"
          }
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server,
  {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.JWT_SECRET
        );
        const currentUser = await User
          .findById(decodedToken.id);
        return { currentUser };
      }
    } }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});