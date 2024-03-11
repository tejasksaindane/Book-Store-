import express from "express";
import { book_model } from "../model/book_model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const all_books = await book_model.find({});
    return res.status(200).json({
      count: all_books.length,
      data: all_books,
    });
  } catch (e) {
    res.status(500).send({ Message: e.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await book_model.findById(id);
    return res.status(200).json(book);
  } catch (e) {
    res.status(500).send({ Message: e.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(500).send({ message: "Please fill the fields" });
    } else {
      const { id } = req.params;
      const book = await book_model.findByIdAndUpdate(id, req.body);

      if (!book) {
        return res.status(404).send({ message: "Book not fount" });
      }
      return res.status(200).send({ message: "Book details updated" });
    }
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await book_model.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).send("Book not found");
    }
    return res.status(200).send("Book deleted from DB successfully");
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Please fill all the required fields");
    } else {
      const new_book = {
        title: req.body.title,
        author: req.body.author,
        publishYear: req.body.publishYear,
        email: req.body.email,
      };

      const book = await book_model.create(new_book);

      return res.status(200).send(book);
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
});

export default router;
