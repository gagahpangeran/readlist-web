import { gql } from "@apollo/client";
import React from "react";

export const GET_READLISTS = gql`
  query getReadlists {
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
