import gql from "graphql-tag";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_PROJECT = gql`
  mutation saveProject($projectData: ProjectInput!) {
    saveProject(projectData: $projectData) {
      _id
      username
      email
      savedProjects {
        pId
        pTitle
        pOrganizer
        pDescription
        pGoal
        pImage
        pLink
      }
    }
  }
`;

export const REMOVE_PROJECT = gql`
  mutation removeProject($pId: ID!) {
    removeProject(pId: $pId) {
      _id
      username
      email
      savedProjects {
        pId
        pTitle
        pOrganizer
        pDescription
        pGoal
        pImage
        pLink
      }
    }
  }
`;
