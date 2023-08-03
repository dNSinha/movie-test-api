import { MovieCommentResponse, MovieRating } from "../types/movieComment";
import { MovieComment, MovieCommentModel } from "../models";

export const getMovieCommentRecord = async (movieId: string): Promise<MovieCommentResponse[]> => {
    const movieCommentList: MovieCommentResponse[] = [];
    const movieComments: MovieComment[] | null = await MovieCommentModel.find({ movieId });

    if (movieComments.length >= 0) {
        movieComments.map(movieComment => {
            movieCommentList.push({
                id: movieComment._id,
                userName: movieComment.userName,
                movieId: movieComment.movieId,
                comment: movieComment.comment,
                rating: movieComment.rating
            });
        });
    }

    return movieCommentList;
}

export const getAllMovieAvergaeRating = async (): Promise<MovieRating[]> => {
    const movieRating: MovieRating[] = await MovieCommentModel.aggregate([
        { $group: { _id: "$movieId", averageRating: { $avg: "$rating" } } }
    ]);

    return movieRating;
}

export const getMovieAvergaeRating = async (movieId: string): Promise<MovieRating> => {
    const movieRating: MovieRating[] = await MovieCommentModel.aggregate([{ $match: { movieId } },
    { $group: { _id: "$movieId", averageRating: { $avg: "$rating" } } }]);

    return movieRating[0];
}

export const addMovieCommentRecord = async (commentDetails: any): Promise<MovieCommentResponse> => {
    const { movieId, userName, comment, rating } = commentDetails;

    // To make sure movie is rated only once
    const existingComment: number = await MovieCommentModel.countDocuments({ movieId, userName });
    if (existingComment) {
        throw new Error(`Comment by user ${userName} for this movie is already registered!`);
    }
    const movieComment: MovieComment = new MovieCommentModel({
        movieId,
        userName,
        comment,
        rating
    });
    await movieComment.save();
    return {
        id: movieComment._id,
        userName: movieComment.userName,
        movieId: movieComment.movieId,
        comment: movieComment.comment,
        rating: movieComment.rating
    };
}