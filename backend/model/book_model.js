import mongoose from "mongoose";
import { book_shema, user_shema } from "../schema/book_schema.js";

export const book_model = mongoose.model("book", book_shema);

export const user_model = mongoose.model("user", user_shema);
