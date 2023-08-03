const typeDef = `
    type User {
        id: ID!
        username: String!
        token: String!
    }

    type Query {
        currentUser(id: ID!): User!
    }

    type LoginResponse {
        token: String
        user: User
    }

    type Mutation {
        register(username: String!, password: String!): User!
        login(username: String!, password: String!): LoginResponse!
    }    
`;
export default typeDef;
