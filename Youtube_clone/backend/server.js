import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import { loginRoute } from "./routes/login.route.js";
import { registerRoute } from "./routes/register.route.js";
import { videosRoute } from "./routes/videos.route.js";
import { channelRoutes } from "./routes/channel.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Connecting my server to database:-
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Server is connected with the MongoDB");
  })
  .catch((err) => {
    console.log("Server is refused to connect with MongoDB", err);
  });

// Middleware Services:-
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// Calling all api routes:-
loginRoute(app);
registerRoute(app);
videosRoute(app);
channelRoutes(app);

// Start Server:-
app.listen(PORT, () => {
  console.log(`Your app server is running on http://localhost:${PORT}/`);
});
