export interface MovieCommentResponse {
    id: string;
    userName: string;
    movieId: string;
    comment: string;
    rating: number;
  }

export interface MovieRating {
    _id: string;
    averageRating: number;
}