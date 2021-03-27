import { gql } from "@apollo/client";
import { READ_LIST } from "./fragment";

export const ADD_READ_LIST = gql`
  ${READ_LIST}
  mutation AddReadList($data: ReadListInput!) {
    addReadList(data: $data) {
      ...ReadList
    }
  }
`;

export const DELETE_READ_LISTS = gql`
  ${READ_LIST}
  mutation DeleteReadLists($ids: [ID!]!) {
    deleteReadLists(ids: $ids) {
      ...ReadList
    }
  }
`;
