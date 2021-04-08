import { gql, useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  AddReadList,
  AddReadListVariables,
  GetAllReadLists,
  GetAllReadListsVariables,
  Order,
  ReadList,
  ReadListFields
} from "../types/generated-types";

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

export default function useReadList() {
  const [delayed, setDelayed] = useState(false);
  const [allReadLists, setAllReadLists] = useState<ReadList[] | undefined>();

  const { data, loading: queryLoading, refetch, error } = useQuery<
    GetAllReadLists,
    GetAllReadListsVariables
  >(GET_ALL_READ_LISTS, {
    fetchPolicy: "cache-and-network",
    variables: {
      skip: 0,
      limit: 10,
      sort: { fields: ReadListFields.readAt, order: Order.DESC },
      filter: { readAt: { isNull: false } }
    }
  });

  const [addReadList, { loading: addLoading }] = useMutation<
    AddReadList,
    AddReadListVariables
  >(ADD_READ_LIST, {
    errorPolicy: "all",
    onCompleted: () => {
      refetch();
    }
  });

  useEffect(() => {
    setDelayed(true);
    const timeout = setTimeout(() => {
      setDelayed(false);
      setAllReadLists(data?.allReadLists);
    }, 500);
    return () => clearTimeout(timeout);
  }, [data]);

  return {
    allReadLists,
    loading: queryLoading || addLoading || delayed,
    refetch,
    error: error !== undefined,
    addReadList
  };
}
