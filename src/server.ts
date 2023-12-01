/** External */
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

/** Internal */
import { authRouter } from "./routers";
import { validateUser } from "./utils/authUtils";
import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";
import { AuthenticatedRequest, Context } from "./types";

const startServer = async () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use("/auth", authRouter);

  const server = new ApolloServer<Context>({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }: { req: AuthenticatedRequest }) => {
        const user = await validateUser(req.headers.authorization as string);
        return { name: "Saurabh", user };
      },
    })
  );

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
};

startServer();
