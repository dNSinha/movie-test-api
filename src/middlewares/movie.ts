import { MovieAddRequest, MovieEditRequest, MovieResponse } from "../types/movie";
import { Movie, MovieModel } from "../models";

export const getMovieRecord = async (id: string): Promise<MovieResponse> => {

    const movie: Movie | null = await MovieModel.findOne({ _id: id });
    if (!movie) {
        throw new Error(`No movie found with name ${id}!`);
    }
    return {
        id: movie._id,
        movieName: movie.movieName,
        releaseDate: movie.releaseDate.toString(),
        duration: movie.duration,
        actors: movie.actors
    };
}

export const getMoviesRecord = async (): Promise<MovieResponse[]> => {
    const movies: Movie[] | null = await MovieModel.find().sort({ movieName: -1 });
    if (movies.length === 0) {
        throw new Error("No movies found!");
    }
    const movieList: MovieResponse[] = [];
    movies.map(movie => {
        movieList.push({
            id: movie._id,
            movieName: movie.movieName,
            releaseDate: movie.releaseDate.toString(),
            duration: movie.duration,
            actors: movie.actors
        });
    });
    return movieList;
}

export const addMovieRecord = async (movieDetails: MovieAddRequest): Promise<any> => {
    const { movieName, releaseDate, duration, actors } = movieDetails;
    const existingUser: number = await MovieModel.countDocuments({ movieName });
    if (existingUser) {
        throw new Error("Movie already registered!");
    }
    const movie: Movie = new MovieModel({
        movieName,
        releaseDate: new Date(releaseDate),
        duration,
        actors
    });
    await movie.save();
    return {
        id: movie._id,
        movieName: movie.movieName,
        releaseDate: movie.releaseDate.toString(),
        duration: movie.duration,
        actors: movie.actors
    };
}

export const editMovieRecord = async (movieDetails: MovieEditRequest): Promise<boolean> => {
    const { id, movieName, releaseDate, duration, actors } = movieDetails;
    const movie: Movie | null = await MovieModel.findOne({ _id: id });
    if (!movie) {
        throw new Error("Movie not found!");
    }

    return !!(await MovieModel.updateOne({ _id: id },
        { movieName: movieName, releaseDate: releaseDate, duration: duration, actors: actors }));
}

export const deleteMovieRecord = async (id: string): Promise<boolean> => {
    const movie: Movie | null = await MovieModel.findOne({ _id: id });
    if (!movie) {
        throw new Error("Movie not found!");
    }

    return !!(await MovieModel.deleteOne({ _id: id })).deletedCount;
}
