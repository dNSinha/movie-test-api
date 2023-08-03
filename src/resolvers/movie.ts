import { MovieResponse, MovieRatingComment, MovieRatingResponse } from "../types/movie";
import { addMovieRecord, deleteMovieRecord, editMovieRecord, getMovieRecord, getMoviesRecord } from "../middlewares/movie";
import { getMovieAvergaeRating, getAllMovieAvergaeRating, getMovieCommentRecord } from "../middlewares/movieComment";
import { MovieCommentResponse, MovieRating } from "../types/movieComment";

export const getMovie = async (_: void, _args: any): Promise<MovieRatingComment> => {
    const { id } = _args;
    if (!id) {
        throw new Error("Enter movie name!");
    }
    const movie: MovieResponse = await getMovieRecord(id);
    const rating: MovieRating = await getMovieAvergaeRating(id);
    const comment: MovieCommentResponse[] = await getMovieCommentRecord(id);

    const movieResponse: MovieRatingComment = {
        ...movie,
        averageUserRating: rating?.averageRating,
        comment
    };

    return movieResponse;
}

export const getMovies = async (_: void, _args: any): Promise<MovieRatingResponse[]> => {
    const movieList: MovieRatingResponse[] = [];
    const movies: MovieResponse[] = await getMoviesRecord();
    const ratings: MovieRating[] = await getAllMovieAvergaeRating();

    movies.map(movie => {
        const rating = ratings.find(rating => rating._id == movie.id);

        movieList.push({
            ...movie,
            averageUserRating: rating?.averageRating
        });
    });
    return movieList;
}

export const addMovie = async (_: void, args: any): Promise<MovieResponse> => {
    const movieAdded: MovieResponse = await addMovieRecord(args);
    return movieAdded;
}

export const editMovie = async (_: void, args: any): Promise<boolean> => {
    const movieEdited: boolean = await editMovieRecord(args);
    return movieEdited;
}

export const deleteMovie = async (_: void, args: any): Promise<boolean> => {
    const { id } = args;
    const movieDeleted: boolean = await deleteMovieRecord(id);
    return movieDeleted;
}


