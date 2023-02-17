import express from "express";
import { createServer } from "http";
import cors from "cors";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
  unauthorizedHandler,
  forbiddenHandler,
} from "./errorHandlers";
import usersRouter from "./api/users/index";
import accommodationRouter from "./api/accommodation/index";

const expressServer = express();

const httpServer = createServer(expressServer);

//middlewares
expressServer.use(cors());
expressServer.use(express.json());

// endpoints
expressServer.use("/users", usersRouter);
expressServer.use("/accommodation", accommodationRouter);

// error handlers
expressServer.use(badRequestHandler);
expressServer.use(unauthorizedHandler);
expressServer.use(forbiddenHandler);
expressServer.use(notFoundHandler);
expressServer.use(genericErrorHandler);

export { httpServer, expressServer };
