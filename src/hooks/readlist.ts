import {
  ApolloError,
  makeVar,
  useLazyQuery,
  useMutation,
  useReactiveVar
} from "@apollo/client";
import { useEffect } from "react";
import {
  ADD_READ_LIST,
  DELETE_READ_LISTS,
  EDIT_READ_LIST,
  GET_ALL_READ_LISTS
} from "../gql/readlist.gql";
import {
  AddReadList,
  AddReadListVariables,
  DeleteReadLists,
  DeleteReadListsVariables,
  EditReadList,
  EditReadListVariables,
  GetAllReadLists,
  GetAllReadListsVariables,
  Order,
  ReadList,
  ReadListFields
} from "../types/generated-types";
import { getErrorMessage } from "../utils/error";
import { useSnackbar } from "./snackbar";

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

const selectedVar = makeVar<string[]>([]);

export function useReadListSelect() {
  return {
    selected: useReactiveVar(selectedVar),
    setSelected: (ids: string[]) => selectedVar(ids)
  };
}

const editDataVar = makeVar<EditReadListVariables | null>(null);

export function useReadListEditData() {
  return {
    editData: useReactiveVar(editDataVar),
    setEditData: (data: EditReadListVariables | null) => editDataVar(data)
  };
}

const allReadListsVar = makeVar<ReadList[]>([]);

export function useGetReadList() {
  const { onError } = useOnError();

  const [getAllReadLists, { data, loading, refetch }] = useLazyQuery<
    GetAllReadLists,
    GetAllReadListsVariables
  >(GET_ALL_READ_LISTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: initialVariables,
    errorPolicy: "all",
    onError
  });

  useEffect(() => {
    if (data !== undefined) {
      allReadListsVar(data?.allReadLists);
    }
  }, [data]);

  return {
    getAllReadLists,
    allReadLists: useReactiveVar(allReadListsVar),
    loading,
    refetch
  };
}

export function useAddReadList() {
  const [addReadList, { loading }] = useMutation<
    AddReadList,
    AddReadListVariables
  >(ADD_READ_LIST, {
    ...usePostMutation("Success add new read list")
  });

  return {
    addReadList,
    loading
  };
}

export function useEditReadList() {
  const [editReadList, { loading }] = useMutation<
    EditReadList,
    EditReadListVariables
  >(EDIT_READ_LIST, {
    ...usePostMutation("Success edit read list")
  });

  return {
    editReadList,
    loading
  };
}

export function useDeleteReadList() {
  const [deleteReadLists, { loading }] = useMutation<
    DeleteReadLists,
    DeleteReadListsVariables
  >(DELETE_READ_LISTS, {
    ...usePostMutation("Success delete read list")
  });

  return {
    deleteReadLists,
    loading
  };
}

function useOnError() {
  const { openSnackbar } = useSnackbar();

  const onError = (error: ApolloError) => {
    const message = getErrorMessage(error);
    openSnackbar(`Error! ${message}`, "error");
  };

  return {
    onError
  };
}

function usePostMutation(successMessage: string) {
  const { openSnackbar } = useSnackbar();
  const { onError } = useOnError();

  const refetchQueries = [
    {
      query: GET_ALL_READ_LISTS,
      variables: useReactiveVar(variablesVar)
    }
  ];

  const onCompleted = () => {
    openSnackbar(successMessage, "success");
  };

  return {
    refetchQueries,
    onCompleted,
    onError
  };
}
