require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@as-integrations/express5");
const { typeDefs, resolvers } = require("./graphql");
require("./models"); // ensure associations are initialized

const app = express();

app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "GraphQL API Mahasiswa is running",
  });
});

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startApolloServer() {
  await apolloServer.start();
  app.use("/graphql", expressMiddleware(apolloServer));
  return app;
}

app.startApolloServer = startApolloServer;
app.apolloServer = apolloServer;
app.app = app;

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  startApolloServer().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
      console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    });
  }).catch((err) => {
    console.error("Failed to start server:", err);
  });
}

module.exports = app;
