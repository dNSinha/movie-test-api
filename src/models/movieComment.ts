import mongoose from "mongoose";

export interface MovieComment extends mongoose.Document {
  _id: string;
  userName: string;
  movieId: string;
  comment: string;
  rating: number;
}

const MovieCommentSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    movieId: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    versionKey: false,
  },
);

export const MovieCommentModel = mongoose.model<MovieComment>("MovieComment", MovieCommentSchema, "MovieComments");
