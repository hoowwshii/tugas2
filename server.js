require("dotenv").config();
const app = require("./src/app");

const PORT = process.env.PORT || 4000;

async function start() {
  if (app.startApolloServer) {
    await app.startApolloServer();
  }
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
});
