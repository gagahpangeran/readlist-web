/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteReadLists
// ====================================================

export interface DeleteReadLists_deleteReadLists {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  isRead: boolean;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

export interface DeleteReadLists {
  deleteReadLists: DeleteReadLists_deleteReadLists[];
}

export interface DeleteReadListsVariables {
  ids: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetReadLists
// ====================================================

export interface GetReadLists_readLists {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  isRead: boolean;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

export interface GetReadLists {
  readLists: GetReadLists_readLists[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ReadList
// ====================================================

export interface ReadList {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  isRead: boolean;
  submittedAt: DateTime;
  readAt: DateTime | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
