import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, conn_url } from "./config.js";
import router from "./routes/index.js";
import { user_model } from "./model/book_model.js";
const app = express();
const corsOpts = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type"],
  exposedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));
app.use(express.json());
app.use("/books", router);

app.get("/users", async (req, res) => {
  try {
    const all_users = await user_model.find({});
    return res.status(200).json({
      count: all_users.length,
      data: all_users,
    });
  } catch (e) {
    res.status(500).send({ Message: e.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    if (!req.body.userName || !req.body.email || !req.body.password) {
      return res.status(400).send("Please fill all the required fields");
    } else {
      const data = {
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      };
      const new_user = await user_model.create(data);
      return res.status(201).send({ message: `user added to db: ${new_user}` });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

app.listen(PORT, () => console.log("Express Listening on", PORT));

app.get("/", (req, res) => {
  return res.status(234).send("Running MERN");
});

mongoose
  .connect(conn_url)
  .then(() => {
    console.log("Database Connected");
  })
  .catch((e) => {
    console.log("Error while connecting with DB", e);
  });
