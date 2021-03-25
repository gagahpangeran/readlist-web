import { useQuery } from "@apollo/client";
import React from "react";
import { GetReadLists, GET_READ_LISTS } from "./gql/query";

function Data() {
  const { loading, data } = useQuery<GetReadLists>(GET_READ_LISTS, {
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (data === undefined) {
    return <div>No Data!</div>;
  }

  return (
    <div className="data">
      {data.readLists.map(readList => (
        <ul key={readList.id}>
          <li>ID : {readList.id}</li>
          <li>Title : {readList.title}</li>
          <li>Link : {readList.link}</li>
          <li>Is Read : {readList.isRead}</li>
          <li>Submitted At : {readList.submittedAt}</li>
          <li>Read At : {readList.readAt}</li>
        </ul>
      ))}
    </div>
  );
}

export default Data;
