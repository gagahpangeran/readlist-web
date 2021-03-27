import { gql } from "@apollo/client";

export const READ_LIST = gql`
  fragment ReadList on ReadList {
    id
    title
    link
    readAt
    comment
  }
`;
