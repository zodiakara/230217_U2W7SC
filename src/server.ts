import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
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

const server = express();
const port = process.env.PORT;

//middlewares
server.use(cors());
server.use(express.json());

// endpoints
server.use("/users", usersRouter);
server.use("/accommodation", accommodationRouter);

// error handlers
server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

//db
mongoose.connect(process.env.MONGO_URL!);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`server is running on port ${port}`);
  });
});
