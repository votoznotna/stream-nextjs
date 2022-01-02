import "./env";
import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import express from "express";
import cors from "cors";

import createSchema from "../schema";
import createSession from "../session";
import nextApp from "@stream-me/app";

const handle = nextApp.getRequestHandler();

const port = process.env.PORT || 8000;

async function createServer() {
  try {
    // create mongoose connection
    await createSession();

    // create express app
    const app = express();

    // allow CORS from client app
    const corsOptions = {
      credentials: true,
    };
    app.use(cors(corsOptions));

    // allow JSON requests
    app.use(express.json());

    const schema = await createSchema();

    const apolloServer = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
      introspection: true,
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          settings: {
            "general.betaUpdates": false,
            "editor.theme": "dark",
            "editor.cursorShape": "line",
            "editor.reuseHeaders": true,
            "tracing.hideTracingResponse": true,
            "queryPlan.hideQueryPlanResponse": true,
            "editor.fontSize": 14,
            "editor.fontFamily": `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
            "request.credentials": "include",
          },
        }),
      ],
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: corsOptions });

    // create next app request handler
    await nextApp.prepare();
    app.get("*", (req, res) => handle(req, res));

    // start the server
    app.listen({ port }, () => {
      console.log(
        `🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
      );
    });
  } catch (err) {
    console.log(err);
  }
}

createServer();
