import React from "react";
import { gql } from "@apollo/client";

export const GET_READLISTS = gql`
  query GetReadlists {
    readLists {
      id
      title
      link
      isRead
      submittedAt
      readAt
    }
  }
`;

function Data() {
  return <div className="data"></div>;
}

export default Data;
