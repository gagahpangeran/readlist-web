import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
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
