/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddReadList
// ====================================================

export interface AddReadList_addReadList {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  readAt: DateTime | null;
  comment: string | null;
}

export interface AddReadList {
  addReadList: AddReadList_addReadList;
}

export interface AddReadListVariables {
  data: AddReadListInput;
}

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
  readAt: DateTime | null;
  comment: string | null;
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
// GraphQL query operation: GetAllReadLists
// ====================================================

export interface GetAllReadLists_allReadLists {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  readAt: DateTime | null;
  comment: string | null;
}

export interface GetAllReadLists {
  allReadLists: GetAllReadLists_allReadLists[];
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
  readAt: DateTime | null;
  comment: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddReadListInput {
  link: string;
  title: string;
  readAt?: DateTime | null;
  comment?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
