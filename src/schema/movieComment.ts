const typeDef = `
    type MovieComment {
        id: ID!
        movieId: ID!
        userName: String!
        comment: String!
        rating: Int!
    }

    type Query {
        getMovieComment(movieId: ID!): [MovieComment]!
    }

    type Mutation {
        addMovieComment(movieId: ID!, userName: String!, comment: String!, rating: Int!): MovieComment!
    }
`;
export default typeDef; 
