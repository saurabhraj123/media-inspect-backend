/** External */
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

/** Internal */
import { authRouter } from "./routers";

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/auth", authRouter);

  interface Context {
    name: string;
  }

  const server = new ApolloServer<Context>({
    typeDefs: `type Query { sayHello: String }`,
    resolvers: {
      Query: {
        sayHello: (_, __, ctx) => `Hello ${ctx.name}`,
      },
    },
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        return { name: "Saurabh" };
      },
    })
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
