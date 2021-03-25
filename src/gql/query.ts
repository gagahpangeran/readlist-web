import { gql } from "@apollo/client";

export const GET_READ_LISTS = gql`
  query GetReadLists {
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
