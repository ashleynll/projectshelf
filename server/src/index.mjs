import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js";
import { projectRouter } from "./routes/projects.js"; // Updated route

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter);
app.use("/projects", projectRouter); // Updated route



mongoose.connect(
  "mongodb+srv://ashleyng:myreACTapp123@movies.iuivlbv.mongodb.net/movies?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.listen(3008, () => console.log("Server is up and running!"));
