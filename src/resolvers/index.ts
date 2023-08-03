import { currentUser, register, login } from "./auth";
import { getMovie, getMovies, addMovie, editMovie, deleteMovie } from "./movie";
import { getMovieComment, addMovieComment } from "./movieComment";

const resolverMap = {
  Query: {
    currentUser,
    getMovie,
    getMovies,
    getMovieComment
  },
  Mutation: {
    login,
    register,
    addMovie,
    editMovie,
    deleteMovie,
    addMovieComment
  },
};

export default resolverMap;
