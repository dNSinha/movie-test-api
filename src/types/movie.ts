import { MovieCommentResponse } from "./movieComment";

export interface MovieRatingComment {
  id: string;
  movieName: string;
  releaseDate: string;
  duration: string;
  actors: string[];
  averageUserRating?: number;
  comment?: MovieCommentResponse[];
}

export interface MovieRatingResponse {
    id: string;
    movieName: string;
    releaseDate: string;
    duration: string;
    actors: string[];
    averageUserRating?: number;
  }

  export interface MovieResponse {
    id: string;
    movieName: string;
    releaseDate: string;
    duration: string;
    actors: string[];
  }

  export interface MovieAddRequest {
    movieName: string;
    releaseDate: string;
    duration: string;
    actors: string[];
  }

  export interface MovieEditRequest {
    id: string;
    movieName: string;
    releaseDate: Date;
    duration: string;
    actors: string[];
  }
  