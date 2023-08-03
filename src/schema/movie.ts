const typeDef = `
    type Movie {
        id: ID!
        movieName: String!
        releaseDate: String!
        duration: String!
        actors: [String]!
    }

    type MovieRating {
        id: ID!
        movieName: String!
        releaseDate: String!
        duration: String!
        actors: [String]!
        averageUserRating: Float
    }

    type MovieRatingComment {
        id: ID!
        movieName: String!
        releaseDate: String!
        duration: String!
        actors: [String]!
        averageUserRating: Float
        comment: [MovieComment]
    }

    type MovieComment {
        id: ID!
        movieId: ID!
        userName: String!
        comment: String!
        rating: Int!
    }

    type Query {
        getMovie(id: ID!): MovieRatingComment!
        getMovies: [MovieRating]!
    }

    type Mutation {
        addMovie(movieName: String!, releaseDate: String!, duration: String!, actors: [String]): Movie!
        editMovie(id: ID!, movieName: String!, releaseDate: String!, duration: String!, actors: [String]): Boolean!
        deleteMovie(id: ID!): Boolean!
    }
`;
export default typeDef;
