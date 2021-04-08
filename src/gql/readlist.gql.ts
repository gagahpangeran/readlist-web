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

export const GET_ALL_READ_LISTS = gql`
  ${READ_LIST}
  query GetAllReadLists(
    $skip: Int!
    $limit: Int!
    $sort: ReadListSort!
    $filter: ReadListFilter!
  ) {
    allReadLists(skip: $skip, limit: $limit, sort: $sort, filter: $filter) {
      ...ReadList
    }
  }
`;

export const ADD_READ_LIST = gql`
  ${READ_LIST}
  mutation AddReadList($data: ReadListInput!) {
    addReadList(data: $data) {
      ...ReadList
    }
  }
`;

export const EDIT_READ_LIST = gql`
  ${READ_LIST}
  mutation EditReadList($id: ID!, $data: ReadListInput!) {
    editReadList(id: $id, data: $data) {
      ...ReadList
    }
  }
`;

export const DELETE_READ_LISTS = gql`
  mutation DeleteReadLists($ids: [ID!]!) {
    deleteReadLists(ids: $ids)
  }
`;
