import { gql } from "@apollo/client";

export const DELETE_READ_LISTS = gql`
  mutation DeleteReadLists($ids: [String!]!) {
    deleteReadLists(ids: $ids) {
      id
    }
  }
`;
