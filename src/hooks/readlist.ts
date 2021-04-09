import { useMutation, useQuery } from "@apollo/client";
import { ADD_READ_LIST, GET_ALL_READ_LISTS } from "../gql/readlist.gql";
import {
  AddReadList,
  AddReadListVariables,
  GetAllReadLists,
  GetAllReadListsVariables,
  Order,
  ReadListFields
} from "../types/generated-types";

export function useAddReadList() {
  const [addReadList, { loading }] = useMutation<
    AddReadList,
    AddReadListVariables
  >(ADD_READ_LIST, {
    errorPolicy: "all"
  });

  return {
    addReadList,
    loading
  };
}

export function useGetReadList() {
  const { data, loading, refetch, error } = useQuery<
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

  return {
    allReadLists: data?.allReadLists,
    loading,
    refetch,
    error: error !== undefined
  };
}
