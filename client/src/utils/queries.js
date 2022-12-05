import gql from "graphql-tag";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      projectCount
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
