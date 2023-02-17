import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";
import { expressServer, httpServer } from "./server";

const port = process.env.PORT || 3001;

//db
mongoose.connect(process.env.MONGO_URL!);

mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB!");
  httpServer.listen(port, () => {
    console.table(listEndpoints(expressServer));
    console.log(`server is running on port ${port}`);
  });
});
