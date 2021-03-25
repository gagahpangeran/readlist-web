import { gql } from "@apollo/client";
import ReadList from "../../graphql/ReadList";

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

export interface GetReadLists {
  readLists: ReadList[];
}
