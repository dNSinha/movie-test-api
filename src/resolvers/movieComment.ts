import { MovieCommentResponse } from "../types/movieComment";
import { getMovieCommentRecord, addMovieCommentRecord } from "../middlewares/movieComment";

export const getMovieComment = async (_: void, _args: any): Promise<MovieCommentResponse[]> => {
    const { movieId } = _args;
    if (!movieId) {
        throw new Error("Enter movie name!");
    }
    const movieCommentResponse: MovieCommentResponse[] = await getMovieCommentRecord(movieId);

    return movieCommentResponse;
}

export const addMovieComment = async (_: void, args: any): Promise<MovieCommentResponse> => {

    const movieCommentResponse: MovieCommentResponse = await addMovieCommentRecord(args);
    return movieCommentResponse;
}
