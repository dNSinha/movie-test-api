import mongoose from "mongoose";

export interface Movie extends mongoose.Document {
  _id: string;
  movieName: string;
  releaseDate: Date;
  duration: string;
  actors: [string];
}

const MovieSchema = new mongoose.Schema(
  {
    movieName: { type: String, required: true },
    releaseDate: { type: Date, required: true },
    duration: { type: String, required: true },
    actors: { type: [String], required: true }
  },
  {
    versionKey: false,
  },
);

export const MovieModel = mongoose.model<Movie>("Movie", MovieSchema, "Movies");
