const jwt = require("jsonwebtoken");
const User = require("../Models/User");

async function createContext({ req, connection }) {
  console.log("-----------------connection");
  // console.log("connection.context: ", connection.context);
  console.log(!connection);
  if (connection) {
    // This is a subscription request
    console.log("Subscription context: ", connection.context);
    return connection.context;
  } else {
    // This is a regular request
    console.log("no connection");
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      // console.log("current user:", currentUser);
      return { currentUser };
    }
  }
}

console.log("After createContext");

module.exports = { createContext };
