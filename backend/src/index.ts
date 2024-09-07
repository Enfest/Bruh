import path from "path";
import express from "express";

import http from "http";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { WebSocketServer } from "ws";

import { ApolloServer } from "apollo-server-express";

import "reflect-metadata";
import { buildSchema } from "type-graphql";

import prisma from "./prisma";
import { resolvers } from "./resolvers";
import apiRoute from "./routes";

import { TContext } from "./types/global";

const port = process.env.PORT || 4000;

(async function () {
  const app = express();
  app.use(bodyParser.json({ limit: "20mb" }));
  app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
  app.use(fileUpload());
  app.use("/api", apiRoute);

  const httpServer = http.createServer(app);
  // const pubsub = new PubSub();
  const schema = await buildSchema({
    resolvers,
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  // Creating the WebSocket subscription server
  const wsServer = new WebSocketServer({
    // This is the `httpServer` returned by createServer(app);
    server: httpServer,
    // Pass a different path here if your ApolloServer serves at
    // a different path.
    path: "/graphql-websocket",
  });

  const server = new ApolloServer({
    schema,
    context: async (): Promise<TContext> => {
      return { prisma };
    },
    cache: "bounded",
    introspection: true,
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port }, resolve);
    console.log(`🚀 Server Ready at ${port}! 🚀`);
    console.log(`Graphql Port at ${port}${server.graphqlPath}`);
  });
})();
