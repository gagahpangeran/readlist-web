/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsLogin
// ====================================================

export interface IsLogin {
  isLogin: boolean;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "Auth";
  token: string;
  username: string;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: OpenedDialog
// ====================================================

export interface OpenedDialog {
  openedDialog: string | null;
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

export interface GetAllReadListsVariables {
  skip: number;
  limit: number;
  sort: ReadListSort;
  filter: ReadListFilter;
}

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
  data: ReadListInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditReadList
// ====================================================

export interface EditReadList_editReadList {
  __typename: "ReadList";
  id: string;
  title: string;
  link: string;
  readAt: DateTime | null;
  comment: string | null;
}

export interface EditReadList {
  editReadList: EditReadList_editReadList;
}

export interface EditReadListVariables {
  id: string;
  data: ReadListInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteReadLists
// ====================================================

export interface DeleteReadLists {
  deleteReadLists: boolean;
}

export interface DeleteReadListsVariables {
  ids: string[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Auth
// ====================================================

export interface Auth {
  __typename: "Auth";
  token: string;
  username: string;
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

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export enum ReadListFields {
  readAt = "readAt",
  title = "title",
}

export interface CommentFilter {
  contains?: string | null;
  isNull?: boolean | null;
}

export interface ContainsFilter {
  contains?: string | null;
}

export interface ReadAtFilter {
  from?: DateTime | null;
  to?: DateTime | null;
  isNull?: boolean | null;
}

export interface ReadListFilter {
  title?: ContainsFilter | null;
  link?: ContainsFilter | null;
  comment?: CommentFilter | null;
  readAt?: ReadAtFilter | null;
}

export interface ReadListInput {
  link: string;
  title: string;
  readAt?: DateTime | null;
  comment?: string | null;
}

export interface ReadListSort {
  order: Order;
  fields: ReadListFields;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
