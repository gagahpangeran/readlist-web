import { gql } from "@apollo/client";

export const LOGIN = gql`
  fragment Auth on Auth {
    token
    username
  }
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ...Auth
    }
  }
`;
