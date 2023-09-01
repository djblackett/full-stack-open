require("dotenv").config();
const { ApolloServer } = require("@apollo/server");
const mongoose = require("mongoose");
const typeDefs = require("./src/GraphQL/typeDefs");
const resolvers = require("./src/GraphQL/resolvers");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const cors = require("cors");
const http = require("http");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { createContext } = require("./src/GraphQL/createContext");

mongoose.set("strictQuery", false);
const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set("debug", true);

const start = async () => {

  try {
    const app = express();
    const httpServer = http.createServer(app);

    const wsServer = new WebSocketServer({
      server: httpServer,
      path: "/",
    });

    const schema = makeExecutableSchema({ typeDefs, resolvers });
    const serverCleanup = useServer({ schema }, wsServer);

    const server = new ApolloServer({
      schema,
      plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        {
          async serverWillStart() {
            return {
              async drainServer() {
                await serverCleanup.dispose();
              },
            };
          },
        },],
    });

    await server.start();


    app.use(
      "/",
      cors(),
      express.json(),
      expressMiddleware(server, {
        context: async ({ req, connection }) => await createContext( { req, connection })
      })
    );

    const PORT = 4000;

    httpServer.listen(PORT, () =>
      console.log(`Server is now running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log("Server error:");
    console.log(error);
  }

};


start();
