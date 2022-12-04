const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveProject(projectData: ProjectInput!): User
    removeProject(pId: ID!): User
  }

  type User {
    _id: ID!
    username: String!
    email: String
    projectCount: Int
    savedProjects: [Project]
  }

  type Project {
    pId: ID!
    pTitle: String
    pOrganizer: String
    pDescription: String
    pGoal: String
    pImage: String
    pLink: String
  }

  input ProjectInput {
    pId: String!
    pTitle: String!
    pOrganizer: String!
    pDescription: String!
    pGoal: String!
    pImage: String
    pLink: String
  }

  type Query {
    me: User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
