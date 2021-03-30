import { gql } from "@apollo/client";
import { READ_LIST } from "./fragment";

export const GET_ALL_READ_LISTS = gql`
  ${READ_LIST}
  query GetAllReadLists($skip: Int!, $limit: Int!) {
    allReadLists(skip: $skip, limit: $limit) {
      ...ReadList
    }
  }
`;
