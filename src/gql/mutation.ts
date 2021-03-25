import { gql } from "@apollo/client";
import { READ_LIST } from "./fragment";

export const DELETE_READ_LISTS = gql`
  ${READ_LIST}
  mutation DeleteReadLists($ids: [String!]!) {
    deleteReadLists(ids: $ids) {
      ...ReadList
    }
  }
`;
