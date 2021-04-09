import {
  makeVar,
  useLazyQuery,
  useMutation,
  useReactiveVar
} from "@apollo/client";
import { useEffect } from "react";
import { ADD_READ_LIST, GET_ALL_READ_LISTS } from "../gql/readlist.gql";
import {
  AddReadList,
  AddReadListVariables,
  GetAllReadLists,
  GetAllReadListsVariables,
  Order,
  ReadList,
  ReadListFields
} from "../types/generated-types";

const initialVariables: GetAllReadListsVariables = {
  skip: 0,
  limit: 10,
  sort: { fields: ReadListFields.readAt, order: Order.DESC },
  filter: { readAt: { isNull: false } }
};

const variablesVar = makeVar(initialVariables);

export function useReadListVariable() {
  const variables = useReactiveVar(variablesVar);

  const changeVariables = (vars: Partial<GetAllReadListsVariables>) => {
    variablesVar({
      ...variables,
      ...vars
    });
  };

  return {
    variables,
    changeVariables
  };
}

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

const allReadListsVar = makeVar<ReadList[] | undefined>(undefined);

export function useGetReadList() {
  const [getAllReadLists, { data, loading, refetch, error }] = useLazyQuery<
    GetAllReadLists,
    GetAllReadListsVariables
  >(GET_ALL_READ_LISTS, {
    fetchPolicy: "cache-and-network",
    variables: initialVariables
  });

  useEffect(() => {
    allReadListsVar(data?.allReadLists);
  }, [data]);

  return {
    getAllReadLists,
    allReadLists: useReactiveVar(allReadListsVar),
    loading,
    refetch,
    error: error !== undefined
  };
}
