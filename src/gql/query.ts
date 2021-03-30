import { gql } from "@apollo/client";
import { READ_LIST } from "./fragment";

export const GET_ALL_READ_LISTS = gql`
  ${READ_LIST}
  query GetAllReadLists($skip: Int!, $limit: Int!, $sort: ReadListSort!) {
    allReadLists(skip: $skip, limit: $limit, sort: $sort) {
      ...ReadList
    }
  }
`;
